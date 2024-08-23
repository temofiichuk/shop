import { ExecutionContext, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

class GqlAuthGuard extends AuthGuard("jwt") {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req.user;
	}
}

export const IsUserAuth = () => UseGuards(GqlAuthGuard);
