import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class EditArticleRequest {
  @ApiProperty({
    description: 'Article title',
    minLength: 1,
    maxLength: 200,
    example: 'My First Article',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: 'Article content',
    minLength: 1,
    maxLength: 10000,
    example: 'This is the content of my article...',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10000)
  content: string;
}
