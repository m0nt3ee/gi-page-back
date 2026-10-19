import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { ArticlesController } from 'src/modules/articles/infra/http/controller/articles.controller';
import { ArticlesRepository } from 'src/modules/articles/infra/database/repository/articles.repository';
import { GetArticlesHandler } from 'src/modules/articles/application/query/get-articles.handler';
import { GetArticleByIdHandler } from 'src/modules/articles/application/query/get-article-by-id.handler';
import { CreateArticleHandler } from 'src/modules/articles/application/command/create-article.handler';
import { EditArticleHandler } from 'src/modules/articles/application/command/edit-article.handler';
import { DeleteArticleHandler } from 'src/modules/articles/application/command/delete-article.handler';
import { PrismaModule } from 'src/core/prisma/prisma.module';

const queryHandlers = [GetArticlesHandler, GetArticleByIdHandler];
const commandHandlers = [
  CreateArticleHandler,
  EditArticleHandler,
  DeleteArticleHandler,
];

@Module({
  imports: [PrismaModule, CqrsModule, ConfigModule],
  controllers: [ArticlesController],
  providers: [ArticlesRepository, ...queryHandlers, ...commandHandlers],
})
export class ArticlesModule {}
