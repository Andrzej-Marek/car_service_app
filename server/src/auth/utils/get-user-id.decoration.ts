import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const GetUserId = createParamDecorator(
  (_, context: ExecutionContext): string => {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;
    return req.session.userId;
  },
);
