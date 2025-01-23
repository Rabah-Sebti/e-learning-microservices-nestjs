import { PrismaService } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';

import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        full_name: true,
        email: true,
        media_url: true,
        diploma: true,
        domain: true,
        dob: true,
        state: true,
        address: true,
        mobile: true,
        bio: true,
        password: true,
      },
    });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    delete user.password;
    return user;
  }
  async createUser(body: CreateUserDto) {
    const userExist = await this.prisma.user.findUnique({
      where: { email: body.email },
    });
    if (userExist) throw new BadRequestException('Email exist');
    const hashedPass = await argon.hash(body.password);
    const user = await this.prisma.user.create({
      data: { ...body, password: hashedPass },
    });
    delete user.password;
    return user;
  }

  async updateUser(id: number, body: UpdateUserDto) {
    let newBody: UpdateUserDto = body;
    if (body.password) {
      const hashedPass = await argon.hash(body.password);
      newBody.password = hashedPass;
    }

    const user = await this.prisma.user.update({
      where: { id, email: body.email },
      data: newBody,
    });

    return user;
  }
}
