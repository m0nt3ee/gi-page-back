import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticlesRepository } from '../../infra/database/repository/articles.repository';
import { Logger } from '@nestjs/common';
import { DeleteArticleCommand } from './delete-article.command';
import { ArticleNotFoundError } from '../../model/error/article.error';

@CommandHandler(DeleteArticleCommand)
export class DeleteArticleHandler implements ICommandHandler<DeleteArticleCommand> {
  private readonly logger = new Logger(DeleteArticleHandler.name);

  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async execute(command: DeleteArticleCommand): Promise<void> {
    const { id } = command;

    const article = await this.articlesRepository.findById(id);

    if (!article) {
      throw new ArticleNotFoundError(id);
    }

    await this.articlesRepository.delete(id);
    this.logger.log(`Deleted article (id: ${id})`);
  }
}
