import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-reset-pass') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      // secretOrKey: config.get('JWT_SECRET'),
      secretOrKey: 'secret-key',
    });
  }
  async validate(payload: { userId: number; number: string; exp: number }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    delete user.password;
    return user;
  }
}
