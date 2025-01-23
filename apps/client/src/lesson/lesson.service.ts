import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateLessonDTO } from './dto';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '@app/common';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async createLesson(body: CreateLessonDTO) {
    const lesson = await this.prisma.lesson.create({ data: body });
    return lesson;
  }

  async getLessons() {
    const lessons = await this.prisma.lesson.findMany();
    return lessons;
  }

  async uploadFile(lessonId: number, file: string) {
    const lessonToUp = await this.prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });
    if (!lessonToUp) throw new ForbiddenException('Record Not found');

    const lesson = await this.prisma.lesson.update({
      where: { id: lessonId },
      data: {
        media_url: file,
      },
    });
    return lesson;
  }

  async getLessonUrl(courseId: number, lessonId: number) {
    // try {
    const lesson = await this.prisma.lesson.findUnique({
      where: {
        id: lessonId,
        course_id: courseId,
      },
    });
    if (!lesson.media_url) throw new ForbiddenException('Video does not exist');
    const url = this.generateSignedUrl(lesson.media_url);
    return { url };
    // } catch (error) {
    // }
  }

  generateSignedUrl(filePath: string, expiresIn: number = 2 * 60 * 60) {
    // 2 hours

    const token = jwt.sign({ filePath }, 'JWT_SECRET_VIDEO', {
      expiresIn,
    });
    return `http://localhost:3333/api/videos/${token}`;
  }

  async getSingleLesson(id: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        duration: true,
        media_url: true,
        chapter: { select: { id: true, title: true } },
        course: { select: { id: true, title: true } },
      },
    });
    return lesson;
  }
}
