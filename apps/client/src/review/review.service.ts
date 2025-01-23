import { Injectable } from '@nestjs/common';
import { CreateReviewDTO } from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(userId: number, body: CreateReviewDTO) {
    try {
      const review = await this.prisma.review.create({
        data: {
          userId,
          ...body,
        },
      });
      return review;
    } catch (error) {
      console.log('error create review', error);
    }
  }
  async getReviews(userId: number) {
    const reviews = await this.prisma.review.findMany({
      where: {
        userId,
      },
    });
    return reviews;
  }
}
