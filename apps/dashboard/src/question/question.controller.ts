import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth-admin/guard';

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @UseGuards(JwtGuard)
  createQuestion(@Body() body: CreateQuestionDTO) {
    return this.questionService.createQuestion(body);
  }

  @UseGuards(JwtGuard)
  @Get()
  getQuestions() {
    return this.questionService.getQuestions();
  }

  @Get(':id')
  getQuestionById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.questionService.getQuestionById(id);
  }
}
