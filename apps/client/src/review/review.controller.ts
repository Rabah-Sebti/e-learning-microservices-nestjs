import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDTO } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@UseGuards(JwtGuard)
@Controller('course/review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  createReview(@GetUser('id') userId: number, @Body() body: CreateReviewDTO) {
    return this.reviewService.createReview(userId, body);
  }

  @Get()
  getReviews(@GetUser('id') userId: number) {
    return this.reviewService.getReviews(userId);
  }
}
