import { ApiProperty } from '@nestjs/swagger';
import { Course as CourseEntity } from 'src/_gen/prisma-class/course';

export class PaginationDto {
  @ApiProperty({ description: '현재 페이지' })
  currentPage: number;

  @ApiProperty({ description: '전체 페이지 수' })
  totalPages: number;

  @ApiProperty({ description: '전체 아이템 수' })
  totalItems: number;

  @ApiProperty({ description: '다음 페이지 존재 여부' })
  hasNext: boolean;

  @ApiProperty({ description: '이전 페이지 존재 여부' })
  hasPrev: boolean;
}

export class SearchCourseResponseDto {
  @ApiProperty({ description: '강의 목록', type: CourseEntity, isArray: true })
  courses: CourseEntity[];

  @ApiProperty({ description: '페이지네이션 정보', type: PaginationDto })
  pagination: PaginationDto;
}
