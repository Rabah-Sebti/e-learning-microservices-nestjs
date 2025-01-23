import { Injectable } from '@nestjs/common';
import { CreateQuestionDTO } from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async createQuestion(body: CreateQuestionDTO) {
    const question = await this.prisma.question.create({
      data: body,
      select: {
        id: true,
        description: true,
        quiz: { select: { id: true, description: true } },
      },
    });
    return question;
  }
  async getQuestions() {
    const questions = await this.prisma.question.findMany({
      select: {
        id: true,
        description: true,
        quiz: {
          select: {
            id: true,
            description: true,
            course: {
              select: { id: true, title: true },
            },
          },
        },
      },
    });
    return questions;
  }

  async getQuestionById(questionId: number) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
      select: {
        id: true,
        description: true,
        quiz: { select: { id: true, description: true } },
      },
    });
    return question;
  }
}
