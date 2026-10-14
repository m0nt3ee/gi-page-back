import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetArticlesQuery } from 'src/modules/articles/application/query/get-articles.query';
import { GetArticleByIdQuery } from 'src/modules/articles/application/query/get-article-by-id.query';
import { GetArticlesResponse } from 'src/modules/articles/infra/http/response/get-articles.response';
import { ArticleResponse } from 'src/modules/articles/infra/http/response/article.response';
import { UuidParam } from 'src/core/validation/decorator/uuid-v4-param.decorator';
import { BadRequestResponse } from 'src/core/http/response/bad-request.response';
import { NotFoundResponse } from 'src/core/http/response/not-found.response';
import { Article } from 'src/modules/articles/model/article.model';

@ApiTags('articles')
@Controller('/api/v1/articles')
export class ArticlesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all articles, newest first',
    type: GetArticlesResponse,
  })
  async getArticles(): Promise<GetArticlesResponse> {
    const articles: Article[] = await this.queryBus.execute(
      new GetArticlesQuery(),
    );

    return {
      articles: articles.map((article) => ({
        id: article.id,
        title: article.title,
        content: article.content,
        publishedAt: article.publishedAt,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      })),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get article by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the article',
    type: ArticleResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid article ID format',
    type: BadRequestResponse,
  })
  @ApiNotFoundResponse({
    description: 'Article not found',
    type: NotFoundResponse,
  })
  async getArticleById(@UuidParam('id') id: string): Promise<ArticleResponse> {
    const article: Article = await this.queryBus.execute(
      new GetArticleByIdQuery(id),
    );

    return {
      id: article.id,
      title: article.title,
      content: article.content,
      publishedAt: article.publishedAt,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };
  }
}
