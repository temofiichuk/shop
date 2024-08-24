import { ExecutionContext, Injectable, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
class GqlAuthGuard extends AuthGuard("jwt-user") {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}
}

export const IsUserAuth = () => UseGuards(GqlAuthGuard);
