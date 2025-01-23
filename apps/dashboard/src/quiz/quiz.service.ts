import { Injectable } from '@nestjs/common';
import { CreateQuizDTO, SubmitQuizDTO } from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async createQuiz(body: CreateQuizDTO) {
    const quiz = await this.prisma.quiz.create({ data: body });
    return quiz;
  }

  async getAllQuiz() {
    const allQuiz = await this.prisma.quiz.findMany({
      select: {
        id: true,
        description: true,
        min_rate: true,
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return allQuiz;
  }

  async getQuizById(quizId) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      select: {
        id: true,
        description: true,
        min_rate: true,
        course: { select: { id: true, title: true } },
      },
    });
    return quiz;
  }
}
