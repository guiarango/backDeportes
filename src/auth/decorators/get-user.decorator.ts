import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user._doc;

    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    if (data.length <= 0) return user;

    for (const key of Object.keys(user)) {
      if (!data.includes(key)) delete user[key];
    }

    return user;
  },
);
