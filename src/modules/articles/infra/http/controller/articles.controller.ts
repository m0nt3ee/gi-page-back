import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListArticlesQuery } from 'src/modules/articles/application/query/get-articles.query';
import { GetArticleByIdQuery } from 'src/modules/articles/application/query/get-article-by-id.query';
import { GetArticlesResponse } from 'src/modules/articles/infra/http/response/get-articles.response';
import { ArticleResponse } from 'src/modules/articles/infra/http/response/article.response';
import { UuidParam } from 'src/core/validation/decorator/uuid-v4-param.decorator';
import { GenericBadRequestResponse } from 'src/core/http/response/bad-request.response';
import { NotFoundResponse } from 'src/core/http/response/not-found.response';
import { Article } from 'src/modules/articles/model/article.model';
import { AdminGuard } from 'src/core/http/auth/admin.guard';
import { CreateArticleCommand } from 'src/modules/articles/application/command/create-article.command';
import { CreateArticleRequest } from '../request/create-article.request';
import { DeleteArticleCommand } from 'src/modules/articles/application/command/delete-article.command';
import { EditArticleRequest } from '../request/edit-article.request';
import { EditArticleCommand } from 'src/modules/articles/application/command/edit-article.command';

@ApiTags('articles')
@Controller('/api/v1/articles')
export class ArticlesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all articles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all articles, newest first',
    type: GetArticlesResponse,
  })
  async getArticles(): Promise<GetArticlesResponse> {
    const articles: Article[] = await this.queryBus.execute(
      new ListArticlesQuery(),
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

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create article' })
  @ApiCreatedResponse({
    description: 'Article created successfully',
    type: ArticleResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid article data',
    type: GenericBadRequestResponse,
  })
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() request: CreateArticleRequest,
  ): Promise<ArticleResponse> {
    const article: Article = await this.commandBus.execute(
      new CreateArticleCommand(request.title, request.content),
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

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete article by ID' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ description: 'Article with given ID does not exist' })
  @ApiBadRequestResponse({ description: 'Given ID is not a valid UUID' })
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@UuidParam('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeleteArticleCommand(id));
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Edit an article' })
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Invalid project data' })
  @ApiNotFoundResponse({ description: 'Project with that ID does not exists' })
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async edit(
    @UuidParam('id') id: string,
    @Body() body: EditArticleRequest,
  ): Promise<void> {
    const { content, title } = body;
    await this.commandBus.execute(new EditArticleCommand(id, title, content));
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
    type: GenericBadRequestResponse,
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
