import { Injectable } from '@nestjs/common';
import { CreateChapterDTO, GetChaptersQuery, updateChapterDTO } from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}

  async createChapter(body: CreateChapterDTO) {
    const chapter = await this.prisma.chapter.create({ data: body });
    return chapter;
  }
  async getChapters() {
    const chapters = this.prisma.chapter.findMany({
      select: {
        id: true,
        title: true,
        duration: true,
        course: {
          select: {
            title: true,
          },
        },
      },
    });
    return chapters;
  }

  async getChapter(id: number) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        duration: true,
        course: {
          select: { id: true, title: true },
        },
      },
    });
    return chapter;
  }

  async updateChapter(id: number, body: updateChapterDTO) {
    const chapter = await this.prisma.chapter.update({
      where: {
        id,
      },
      data: body,
      select: {
        id: true,
        title: true,
        duration: true,
        course: {
          select: { id: true, title: true },
        },
      },
    });
  }
  async getChaptersAdmin(query: GetChaptersQuery) {
    let where: any = {};
    if (query && query.courseId) {
      where.course_id = query.courseId;
    }
    const chapters = this.prisma.chapter.findMany({
      where,
      select: {
        id: true,
        title: true,
      },
    });
    return chapters;
  }
}
