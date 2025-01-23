import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt-reset-pass') {
  constructor() {
    super();
  }
}
