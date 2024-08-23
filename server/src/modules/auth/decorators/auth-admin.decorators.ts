import { ExecutionContext, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

class GqlAuthGuard extends AuthGuard("adminJwt") {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}
}

export const AuthAdmin = () => UseGuards(GqlAuthGuard);
