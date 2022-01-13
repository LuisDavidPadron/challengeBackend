import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { HandlingErrors } from '../errors/error';
import { Tags } from '../tag/entity/tag.entity';
import { TagService } from '../tag/tag.service';
import { ArticleDto, filterDto } from './dto/article.dto';
import { Article } from './entity/article.entity';
import { article } from './interface/article.interface';
import { ArticleRepository } from './repository/article.repository';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,
    private httpService: HttpService,
    private tagService: TagService,
  ) {}

  async createArticle(articleDto: ArticleDto): Promise<Article> {
    if (await this.existArticle(articleDto))
      throw new HandlingErrors('Exist This Article', HttpStatus.FOUND);

    articleDto.tags = await Promise.all(await this.getTags(articleDto.tags));

    const resp = await this.articleRepository.createArticle(articleDto);

    return resp;
  }

  async getTags(tags): Promise<Array<Tags>> {
    return await tags.map(async (tag) => {
      const tagRepo = await this.tagService.getTagExist({
        name: tag as unknown as string,
      });

      if (tagRepo) {
        return tagRepo;
      } else {
        const newTag = await this.tagService.createTag({
          name: tag as unknown as string,
        });
        return newTag;
      }
    });
  }

  async existArticle(articleDto: ArticleDto): Promise<Article> {
    const resp = await this.articleRepository.findOne({
      comment: articleDto.comment_text,
      author: articleDto.author,
      title: articleDto.title,
      created_at: articleDto.created_at,
    });

    return resp;
  }

  @Cron('* 1 * * * *')
  async handleCron() {
    const articles = await this.findAllHacker();

    articles.forEach(async (article: article): Promise<void> => {
      this.createArticle(article);
    });
  }

  async findAllHacker(): Promise<Array<article>> {
    const result = this.httpService.get(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );
    const { data } = await lastValueFrom(result);

    return data.hits.map((hit) => {
      return {
        title: hit.title,
        author: hit.author,
        created_at: hit.created_at,
        comment_text: hit.comment_text,
        tags: hit._tags,
      };
    });
  }

  async getArticles(filter: filterDto): Promise<Array<any>> {
    const articles = this.articleRepository
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.tags', 'tags');

    if (filter.created_at)
      articles.where(
        `trim(to_char(articles.created_at, 'month')) = '${filter.created_at}'`,
      );

    if (filter.author)
      articles.where('author like :author', { author: filter.author });

    if (filter.title)
      articles.where('title like :title', { title: filter.title });

    if (filter.tags && filter.tags.length > 0)
      articles.where(
        `tags.name IN ( ${filter.tags.map((tag) => `'${tag}'`)} )`,
      );

    const [list, count] = await articles
      .skip((+filter.page - 1) * 5)
      .take(5)
      .getManyAndCount();

    return [
      {
        list,
        count,
        page: filter.page,
      },
    ];
  }

  async deleteArticle(id: number): Promise<any> {
    return await this.articleRepository.delete(id);
  }
}
