import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAdmin = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return data ? user?.[data] : user;
  },
);
