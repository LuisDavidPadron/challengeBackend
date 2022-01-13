import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { ArticleRepository } from './repository/article.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { HttpModule } from '@nestjs/axios';
import { TagService } from '../tag/tag.service';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          useFactory: () => ({
            timeout: 5000,
            maxRedirects: 5,
          }),
        }),
        TypeOrmModule.forFeature([ArticleRepository]),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: +process.env.POSTGRES_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.POSTGRES_DB,
          entities: [
            __dirname + '/**/*.entity.ts',
            __dirname + '/**/*.entity.js',
          ],
          synchronize: true,
        }),
      ],
      controllers: [ArticleController],
      providers: [ArticleService, TagService],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
