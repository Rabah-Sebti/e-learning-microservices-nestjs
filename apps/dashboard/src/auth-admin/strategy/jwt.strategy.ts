import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_ADMIN_SECRET'),
    });
  }
  async validate(payload: { sub: number; email: string }) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (!admin) {
      throw new Error('Admin not found'); // Or throw a specific exception
    }

    delete admin.password;
    return admin;
  }
}
