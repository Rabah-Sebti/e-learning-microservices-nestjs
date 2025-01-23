import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService) {}

  async getInstructors() {
    const instructors = await this.prisma.instructor.findMany();
    return { data: instructors, message: 'instructors retreived successfully' };
  }

  async getSingleInstructor(id: number) {
    const instructor = await this.prisma.instructor.findUnique({
      where: { id },
    });
    return instructor;
  }
}
