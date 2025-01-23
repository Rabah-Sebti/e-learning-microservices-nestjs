import { Injectable } from '@nestjs/common';
import { SubmitQuizDTO } from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async getQuiz(courseId: number) {
    const quiz = await this.prisma.quiz.findFirst({
      where: {
        courseId,
      },
      include: {
        questions: {
          select: {
            id: true,
            description: true,
            choices: {
              select: {
                id: true,
                description: true,
              },
            },
          },
        },
      },
    });
    const transformedQuiz = {
      // ...quiz,
      description: quiz.description,
      min_rate: quiz.min_rate,
      questions: quiz.questions,
    };
    return transformedQuiz;
  }

  async postQuiz(quizId: number, body: SubmitQuizDTO) {
    const response = {
      is_passed: true,
      passing_points: 80,
      passing_score: 85,
      points: 85,
      score: 85,
    };
    return response;
  }
}
