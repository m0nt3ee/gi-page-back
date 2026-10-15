export class CreateArticleCommand {
  constructor(
    readonly title: string,
    readonly content: string,
  ) {}
}
