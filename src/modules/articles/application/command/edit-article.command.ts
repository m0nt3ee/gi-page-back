export class EditArticleCommand {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly content: string,
  ) {}
}
