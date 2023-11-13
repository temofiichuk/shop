import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Admin } from "@prisma/client";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentAdmin = createParamDecorator(
  (data: keyof Admin, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return data ? req.user.admin[data] : req.user.admin;
  }
);
