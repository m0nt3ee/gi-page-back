import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ArticlesController } from 'src/modules/articles/infra/http/controller/articles.controller';
import { ArticlesRepository } from 'src/modules/articles/infra/database/repository/articles.repository';
import { GetArticlesHandler } from 'src/modules/articles/application/query/get-articles.handler';
import { GetArticleByIdHandler } from 'src/modules/articles/application/query/get-article-by-id.handler';
import { PrismaModule } from 'src/core/prisma/prisma.module';

const queryHandlers = [GetArticlesHandler, GetArticleByIdHandler];

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [ArticlesController],
  providers: [ArticlesRepository, ...queryHandlers],
})
export class ArticlesModule {}
