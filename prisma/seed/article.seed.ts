import { PrismaService } from '../../src/core/prisma/prisma.service';

const SEED_ARTICLE_IDS = [
  '5e1f0a2b-0001-4000-8000-000000000001',
  '5e1f0a2b-0001-4000-8000-000000000002',
  '5e1f0a2b-0001-4000-8000-000000000003',
  '5e1f0a2b-0001-4000-8000-000000000004',
  '5e1f0a2b-0001-4000-8000-000000000005',
];

export async function seedArticles(prisma: PrismaService): Promise<void> {
  await prisma.article.deleteMany({
    where: {
      id: {
        in: SEED_ARTICLE_IDS,
      },
    },
  });

  await prisma.article.createMany({
    data: [
      {
        id: SEED_ARTICLE_IDS[0],
        title: 'Getting Started with TypeScript',
        content:
          'TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing to the language, which can help catch errors early and improve code quality. In this article, we will explore the basics of TypeScript and how to get started with it.',
        publishedAt: new Date('2026-10-01T10:00:00Z'),
      },
      {
        id: SEED_ARTICLE_IDS[1],
        title: 'Building REST APIs with NestJS',
        content:
          'NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It uses TypeScript by default and combines elements of OOP, FP, and FRP. This article covers the fundamentals of building REST APIs using NestJS.',
        publishedAt: new Date('2026-10-10T14:30:00Z'),
      },
      {
        id: SEED_ARTICLE_IDS[2],
        title: 'Database Management with Prisma',
        content:
          'Prisma is a next-generation ORM that makes database management easier and more type-safe. It provides a powerful query engine and supports multiple databases including PostgreSQL, MySQL, and SQLite. Learn how to use Prisma effectively in your projects.',
        publishedAt: new Date('2026-10-13T09:15:00Z'),
      },
      {
        id: SEED_ARTICLE_IDS[3],
        title: 'Advanced TypeScript Patterns',
        content:
          'Explore advanced TypeScript patterns and techniques to write better, more maintainable code. This article dives into generics, conditional types, and utility types.',
        publishedAt: new Date('2026-10-13T09:15:00Z'),
      },
      {
        id: SEED_ARTICLE_IDS[4],
        title: 'Testing in TypeScript',
        content:
          'Learn how to write effective tests for TypeScript applications using Jest and other testing frameworks. This guide covers unit tests, integration tests, and best practices.',
        publishedAt: new Date('2026-10-13T09:15:00Z'),
      },
    ],
  });

  console.log('Articles seeded successfully');
}
