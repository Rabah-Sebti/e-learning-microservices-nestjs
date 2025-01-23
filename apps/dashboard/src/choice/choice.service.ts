import { Injectable } from '@nestjs/common';
import { CreateChoiceDTO } from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class ChoiceService {
  constructor(private prisma: PrismaService) {}

  async createChoice(body: CreateChoiceDTO) {
    const choice = await this.prisma.choice.create({ data: body });
    return choice;
  }
  async getChoices() {
    const choices = await this.prisma.choice.findMany({
      select: {
        id: true,
        description: true,
        isCorrect: true,
        question: {
          select: {
            id: true,
            description: true,
            quiz: {
              select: {
                id: true,
                description: true,
                course: { select: { id: true, title: true } },
              },
            },
          },
        },
      },
    });
    return choices;
  }

  async getChoiceById(id: number) {
    const choice = await this.prisma.choice.findUnique({
      where: { id },
      select: {
        id: true,
        description: true,
        isCorrect: true,
        question: { select: { id: true, description: true } },
      },
    });
    return choice;
  }
}
