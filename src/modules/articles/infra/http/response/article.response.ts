import { ApiProperty } from '@nestjs/swagger';

export class ArticleResponse {
  @ApiProperty({
    description: 'Unique identifier of the article',
    example: '5e1f0a2b-0001-4000-8000-000000000001',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the article',
    example: 'Getting Started with TypeScript',
  })
  title: string;

  @ApiProperty({
    description: 'Content of the article',
    example:
      'TypeScript is a strongly typed programming language that builds on JavaScript...',
  })
  content: string;

  @ApiProperty({
    description: 'Date when the article was published',
    example: '2026-10-01T10:00:00.000Z',
  })
  publishedAt: Date;

  @ApiProperty({
    description: 'Date when the article was created',
    example: '2026-10-01T09:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the article was last updated',
    example: '2026-10-01T09:00:00.000Z',
  })
  updatedAt: Date;
}
