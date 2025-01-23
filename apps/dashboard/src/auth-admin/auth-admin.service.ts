import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginAdminDTO, RegisterAdminDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { PrismaService } from '@app/common';

@Injectable()
export class AuthAdminService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async login(body: LoginAdminDTO) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: body.email },
    });
    if (!admin) throw new ForbiddenException('Creadentials incorrect');

    const isPasswordMatch = await argon.verify(admin.password, body.password);

    if (!isPasswordMatch)
      throw new ForbiddenException('Creadentials incorrect');
    const data = await this.signToken(admin.id, admin.email);
    delete admin.password;
    const newData = {
      ...admin,
      authorisation: data,
    };
    return {
      data: newData,
      message: 'Successfully login',
    };
  }
  async register(body: RegisterAdminDTO) {
    const adminExist = await this.prisma.admin.findUnique({
      where: { email: body.email },
    });
    if (adminExist) throw new ForbiddenException('Credentials taken');
    const hashedPass = await argon.hash(body.password);
    const admin = await this.prisma.admin.create({
      data: { ...body, password: hashedPass },
    });
    return admin;
  }
  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const expiresIn = 15 * 60 * 60;
    const exp = Math.floor(Date.now() / 1000) + expiresIn;
    const token = await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_ADMIN_SECRET'),
      expiresIn: '15h',
    });

    return { token, exp };
  }
}
