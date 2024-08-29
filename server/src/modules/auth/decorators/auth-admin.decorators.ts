import { ExecutionContext, Injectable, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
class GqlAuthGuard extends AuthGuard("jwt-admin") {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		console.log("context of admin");
		return ctx.getContext().req;
	}
}

export const IsAdminAuth = () => UseGuards(GqlAuthGuard);
