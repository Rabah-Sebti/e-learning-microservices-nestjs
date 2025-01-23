import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getAllReviews() {
    const reviews = await this.prisma.review.findMany({
      select: {
        id: true,
        rate: true,
        review: true,
        user: {
          select: {
            full_name: true,
            email: true,
          },
        },
        course: { select: { title: true } },
      },
    });
    return reviews;
  }
}
