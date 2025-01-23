import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitQuizDTO } from './dto';
import { JwtGuard } from '../auth/guard';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quiz')
@Controller('')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @UseGuards(JwtGuard)
  @Get('dashboard/courses/:id/quiz')
  getQuiz(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
  ) {
    return this.quizService.getQuiz(courseId);
  }

  @UseGuards(JwtGuard)
  @Post('quiz/submit')
  @HttpCode(200)
  submitQuiz(
    @Query(
      'quiz_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    quizId: number,
    @Body() body: SubmitQuizDTO,
  ) {
    return this.quizService.postQuiz(quizId, body);
  }
}
