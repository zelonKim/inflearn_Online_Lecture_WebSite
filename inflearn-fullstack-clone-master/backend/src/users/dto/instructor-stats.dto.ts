import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class InstructorStatsDto {
  @ApiProperty({
    description: '강의 수',
    example: 5,
  })
  @IsNumber()
  coursesCount: number;

  @ApiProperty({
    description: '리뷰 수',
    example: 128,
  })
  @IsNumber()
  reviewsCount: number;

  @ApiProperty({
    description: '질문 수',
    example: 42,
  })
  @IsNumber()
  questionsCount: number;

  @ApiProperty({
    description: '댓글 수',
    example: 89,
  })
  @IsNumber()
  commentsCount: number;
}
