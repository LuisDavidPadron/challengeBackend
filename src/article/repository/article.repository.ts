import { EntityRepository, Repository } from 'typeorm';
import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Article } from '../entity/article.entity';
import { ArticleDto } from '../dto/article.dto';
import { HandlingErrors } from '../../errors/error';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async createArticle(articleDto: ArticleDto): Promise<Article> {
    const { author, title, created_at, tags, comment_text } = articleDto;

    const article = new Article();

    article.author = author;
    article.title = title;
    article.created_at = created_at;
    article.comment = comment_text;
    article.tags = tags;

    try {
      await article.save();
      return article;
    } catch (error) {
      if (error.code === '23505') {
        throw new HandlingErrors(
          'Article already exists',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
