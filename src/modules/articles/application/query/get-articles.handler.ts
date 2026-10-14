import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetArticlesQuery } from 'src/modules/articles/application/query/get-articles.query';
import { ArticlesRepository } from 'src/modules/articles/infra/database/repository/articles.repository';
import { Article } from 'src/modules/articles/model/article.model';

@QueryHandler(GetArticlesQuery)
export class GetArticlesHandler implements IQueryHandler<GetArticlesQuery> {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async execute(): Promise<Article[]> {
    return this.articlesRepository.findAll();
  }
}
