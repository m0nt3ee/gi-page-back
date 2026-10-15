import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from './create-article.command';
import { ArticlesRepository } from '../../infra/database/repository/articles.repository';
import { Article } from '../../model/article.model';
import { randomUUID } from 'crypto';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<
  CreateArticleCommand,
  Article
> {
  private readonly logger = new Logger(CreateArticleHandler.name);

  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async execute(command: CreateArticleCommand): Promise<Article> {
    const now = new Date();
    const article = new Article(
      randomUUID(),
      command.title,
      command.content,
      now,
      now,
      now,
    );

    await this.articlesRepository.create(article);
    this.logger.log(`Created new article (id: ${article.id})`);
    return article;
  }
}
