import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Admin, EnumAdminRole } from "@prisma/client";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentAdmin = createParamDecorator(
	(select: keyof Admin, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context);
		const req = ctx.getContext().req;
		if (req.user.role === EnumAdminRole.ADMIN)
			return select ? req.user[select] : req.user;
	},
);
