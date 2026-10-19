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

  async create(article: Article): Promise<Article> {
    return await this.prisma.article.create({
      data: {
        id: article.id,
        title: article.title,
        content: article.content,
        publishedAt: article.publishedAt,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      },
    });
  }

  async edit(id: string, title: string, content: string): Promise<Article> {
    const updatedArticle = await this.prisma.article.update({
      where: { id },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    return new Article(
      updatedArticle.id,
      updatedArticle.title,
      updatedArticle.content,
      updatedArticle.publishedAt,
      updatedArticle.createdAt,
      updatedArticle.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.article.delete({ where: { id } });
  }
}
