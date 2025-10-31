import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { InstructorStatsDto } from './dto/instructor-stats.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      omit: {
        hashedPassword: true,
      },
      where: {
        id: userId,
      },
    });
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateUserDto,
      },
      omit: {
        hashedPassword: true,
      },
    });
  }

  async getInstructorStats(userId: string): Promise<InstructorStatsDto> {
    const coursesCount = await this.prisma.course.count({
      where: {
        instructorId: userId,
      },
    });

    const reviewsCount = await this.prisma.courseReview.count({
      where: {
        course: {
          instructorId: userId,
        },
      },
    });

    const questionsCount = await this.prisma.courseQuestion.count({
      where: {
        course: {
          instructorId: userId,
        },
      },
    });

    const commentsCount = await this.prisma.courseComment.count({
      where: {
        question: {
          course: {
            instructorId: userId,
          },
        },
      },
    });

    return {
      coursesCount,
      reviewsCount,
      questionsCount,
      commentsCount,
    };
  }
}
