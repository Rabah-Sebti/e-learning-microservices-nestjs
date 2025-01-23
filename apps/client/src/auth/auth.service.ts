import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(body: SignUpDTO) {
    try {
      const userExist = await this.prismaService.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (userExist)
        throw new BadRequestException('Creadentials already taken');
      const hashedPass = await argon.hash(body.password);

      const newUser = await this.prismaService.user.create({
        data: {
          ...body,
          password: hashedPass,
        },
      });

      delete newUser.password;
      const data = await this.signToken(newUser.id, newUser.email);
      return { ...newUser, authorisation: data };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('creadentials taken');
        }
      }
      throw error;
    }
  }
  async signIn(body: SignInDTO) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) throw new ForbiddenException('Creadentials incorrect');

      const isPasswordMatch = await argon.verify(user.password, body.password);
      if (!isPasswordMatch)
        throw new ForbiddenException('credentials doesnt match');

      const data = await this.signToken(user.id, user.email);
      delete user.password;
      const newData = {
        ...user,
        authorisation: data,
      };
      return {
        data: newData,
        message: 'Login successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('creadentials taken');
        }
      }
      throw error;
    }
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const expiresIn = 15 * 60 * 60;
    const exp = Math.floor(Date.now() / 1000) + expiresIn;
    const token = await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '15h',
    });

    return { token, exp };
  }
}
