export class CreateArticleCommand {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly content: string,
  ) {}
}
