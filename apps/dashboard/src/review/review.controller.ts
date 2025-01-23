import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtGuard } from '../auth-admin/guard';

@UseGuards(JwtGuard)
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  getReviews() {
    return this.reviewService.getAllReviews();
  }
}
