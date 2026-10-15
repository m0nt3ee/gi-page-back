import { NotFoundException } from '@nestjs/common';

export class ArticleNotFoundError extends NotFoundException {
  constructor(articleId: string) {
    super(`Article with ID ${articleId} not found`);
  }
}
