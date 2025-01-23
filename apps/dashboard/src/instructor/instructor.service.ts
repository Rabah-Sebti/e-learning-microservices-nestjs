import { Injectable } from '@nestjs/common';
import { CreateInstructorDTO, UpdateInstructorDTO } from './dto/instructor.dto';
import { PrismaService } from '@app/common';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService) {}

  async createInstructor(body: CreateInstructorDTO) {
    const instructor = await this.prisma.instructor.create({ data: body });
    return instructor;
  }
  async getInstructors() {
    const instructors = await this.prisma.instructor.findMany();
    return { data: instructors, message: 'instructors retreived successfully' };
  }

  async updateInstructor(id: number, body: UpdateInstructorDTO) {
    const instructor = await this.prisma.instructor.update({
      where: {
        id,
      },
      data: body,
    });
    return instructor;
  }

  async getSingleInstructor(id: number) {
    const instructor = await this.prisma.instructor.findUnique({
      where: { id },
    });
    return instructor;
  }
}
