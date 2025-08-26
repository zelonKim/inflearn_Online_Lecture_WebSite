import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  // 유효성 검사
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;
}
