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
import { CreateQuizDTO, SubmitQuizDTO } from './dto';
import { JwtGuard as JwtAdminGuard } from '../auth-admin/guard';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post()
  @UseGuards(JwtAdminGuard)
  createQuiz(
    @Body() body: CreateQuizDTO,
    // @Param(
    //   'id',
    //   new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    // )
    // courseId: number,
  ) {
    return this.quizService.createQuiz(body);
  }

  @Get()
  @UseGuards(JwtAdminGuard)
  getQuizs() {
    return this.quizService.getAllQuiz();
  }
  @Get(':id')
  getQuizById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    quizId: number,
  ) {
    return this.quizService.getQuizById(quizId);
  }
}
