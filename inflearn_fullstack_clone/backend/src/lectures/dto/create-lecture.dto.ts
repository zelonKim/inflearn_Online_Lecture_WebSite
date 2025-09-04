import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLectureDto {
  @ApiProperty({ description: '섹션 제목' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
