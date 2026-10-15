import { ApiProperty } from '@nestjs/swagger';
import { ArticleResponse } from 'src/modules/articles/infra/http/response/article.response';

export class GetArticlesResponse {
  @ApiProperty({
    description: 'List of articles',
    type: [ArticleResponse],
  })
  articles: ArticleResponse[];
}
