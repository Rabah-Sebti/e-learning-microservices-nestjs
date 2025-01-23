import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class VideoAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.params.token;

    try {
      jwt.verify(token, 'JWT_SECRET_VIDEO');
      return true;
    } catch (error) {
      throw new ForbiddenException('Access denied');
    }
  }
}
