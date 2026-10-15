import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticlesRepository } from '../../infra/database/repository/articles.repository';
import { Logger } from '@nestjs/common';
import { EditArticleCommand } from './edit-article.command';
import { ArticleNotFoundError } from '../../model/error/article.error';
import { Article } from '../../model/article.model';

@CommandHandler(EditArticleCommand)
export class EditArticleHandler implements ICommandHandler<
  EditArticleCommand,
  Article
> {
  private readonly logger = new Logger(EditArticleHandler.name);

  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async execute(command: EditArticleCommand): Promise<Article> {
    const { id, title, content } = command;

    const article = await this.articlesRepository.findById(id);

    if (!article) {
      throw new ArticleNotFoundError(id);
    }

    const updatedArticle = await this.articlesRepository.edit(
      id,
      title,
      content,
    );
    this.logger.log(`Updated article (id: ${id})`);
    return updatedArticle;
  }
}
