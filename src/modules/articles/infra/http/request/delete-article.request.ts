import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteArticleRequest {
  @ApiProperty({
    description: 'Article id',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
