import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { EnumUserRole, User } from "@prisma/client";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
  (select: keyof User, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (req.user.role === EnumUserRole.USER)
      return select ? req.user[select] : req.user;
  }
);
