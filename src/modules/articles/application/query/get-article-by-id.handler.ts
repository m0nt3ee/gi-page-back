import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetArticleByIdQuery } from 'src/modules/articles/application/query/get-article-by-id.query';
import { ArticlesRepository } from 'src/modules/articles/infra/database/repository/articles.repository';
import { Article } from 'src/modules/articles/model/article.model';

@QueryHandler(GetArticleByIdQuery)
export class GetArticleByIdHandler implements IQueryHandler<GetArticleByIdQuery> {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async execute(query: GetArticleByIdQuery): Promise<Article> {
    const article = await this.articlesRepository.findById(query.id);

    if (!article) {
      throw new NotFoundException(`Article with ID ${query.id} not found`);
    }

    return article;
  }
}
