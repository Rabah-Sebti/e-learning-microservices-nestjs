import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ResetPasswordDTO, UpdateAccountDTO, UpdateProfileDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as jwt from 'jsonwebtoken';
import { PasswordResetEvent } from '../email.event';
import * as argon from 'argon2';
import { PrismaService } from '@app/common';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    // private authService:AuthService
  ) {}
  getUser(userId: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
  async getRelatedCourses(userId: number) {
    const courseOrdred = await this.prisma.course_Order.findMany({
      where: {
        user_id: userId,
      },
      select: {
        courses: {
          select: { id: true, category: { select: { id: true } } },
        },
      },
    });
    const coursesIds = courseOrdred.flatMap((order) =>
      order.courses.map((course) => course.id),
    );

    const categoryIds = courseOrdred.flatMap((order) =>
      order.courses.map((course) => course.category.id),
    );

    // const courses=await this.prisma.course.findMany()
    const courses = await this.prisma.course.findMany({
      where: {
        id: { notIn: coursesIds },
        course_category: { in: categoryIds },
      },
      include: {
        category: {
          select: {
            title: true,
          },
        },
        sub_category: {
          select: {
            title: true,
          },
        },
        chapters: {
          select: {
            id: true,
            title: true,
            duration: true,
            lesson: {
              select: {
                id: true,
                title: true,
                duration: true,
              },
            },
          },
        },
        course_instructors: {
          select: {
            name: true,
            expert: true,
            image_url: true,
          },
        },
        reviews: {
          select: {
            rate: true,
          },
        },
        course_users: { select: { id: true } },
      },
    });
    return courses;
  }

  async updatePicture(file: string, userId: number) {
    const data = await this.prisma.user.update({
      where: { id: userId },
      data: {
        media_url: file,
      },
    });
    return data;
  }

  async updateProfile(userId: number, body: UpdateProfileDTO) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new ForbiddenException('User doesnt exist');
      if (body.dob) {
        body.dob = new Date(body.dob).toISOString();
      }
      const newUser = await this.prisma.user.update({
        where: { id: userId },
        data: body,
      });
      delete newUser.password;
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async updateAccount(userId: number, body: UpdateAccountDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new ForbiddenException('User doesnt exist');

      const newUser = await this.prisma.user.update({
        where: { id: userId },
        data: { email: body.email },
      });
      if (body.change_password) {
        const token = jwt.sign({ userId: user.id }, 'secret-key', {
          expiresIn: '1h', // Token expiration
        });
        // const token=await this.authService.signToken(newUser.id,newUser.email)
        const resetLink = `http://localhost:3000/reset-password?token=${token}`;

        // Emit the password reset event
        this.eventEmitter.emit(
          'password.reset',
          new PasswordResetEvent(newUser.email, resetLink),
        );
      }
      delete newUser.password;
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(userId: number, body: ResetPasswordDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        email: body.email,
      },
    });

    if (!user) throw new BadRequestException('verify your information');

    const isPasswordMatch = await argon.verify(user.password, body.password);

    if (!isPasswordMatch)
      throw new ForbiddenException('credentials doesnt match');

    const hashedPass = await argon.hash(body.new_password);
    const newUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPass,
      },
    });
    delete newUser.password;
    return newUser;
  }
}
