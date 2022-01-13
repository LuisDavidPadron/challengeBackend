import { HttpService } from '@nestjs/axios';
import { TagService } from '../tag/tag.service';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from './repository/article.repository';

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;
  let articleRepository: ArticleRepository;
  let httpService: HttpService;
  let tagService: TagService;

  beforeEach(() => {
    articleService = new ArticleService(
      articleRepository,
      httpService,
      tagService,
    );
    articleController = new ArticleController(articleService);
  });

  describe('getArticles', () => {
    it('should return an array of articles', async () => {
      const result = ['test'];
      jest
        .spyOn(articleService, 'getArticles')
        .mockImplementation(async () => result);

      expect(
        await articleController.getArticles({
          author: '',
          title: '',
          created_at: '',
          page: 1,
          tags: [],
        }),
      ).toBe(result);
    });
  });
});
