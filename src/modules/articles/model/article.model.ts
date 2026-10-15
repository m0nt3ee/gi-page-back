export class Article {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly publishedAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
