import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Article } from 'src/modules/articles/model/article.model';

@Injectable()
export class ArticlesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    });

    return articles.map(
      (article) =>
        new Article(
          article.id,
          article.title,
          article.content,
          article.publishedAt,
          article.createdAt,
          article.updatedAt,
        ),
    );
  }

  async findById(id: string): Promise<Article | null> {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return null;
    }

    return new Article(
      article.id,
      article.title,
      article.content,
      article.publishedAt,
      article.createdAt,
      article.updatedAt,
    );
  }
}
