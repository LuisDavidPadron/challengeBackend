import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { filterDto } from './dto/article.dto';

@ApiTags('articles')
@ApiBearerAuth()
@Controller('articles')
@UseGuards(AuthGuard())
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getArticles(
    @Body(ValidationPipe) filter: filterDto,
  ): Promise<Array<any>> {
    return await this.articleService.getArticles(filter);
  }

  @Delete(':id')
  async deleteArticle(@Param(ValidationPipe) id: number): Promise<Array<any>> {
    return await this.articleService.deleteArticle(id);
  }
}
