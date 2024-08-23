"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdmin = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const graphql_1 = require("@nestjs/graphql");
class GqlAuthGuard extends (0, passport_1.AuthGuard)("adminJwt") {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
const AuthAdmin = () => (0, common_1.UseGuards)(GqlAuthGuard);
exports.AuthAdmin = AuthAdmin;
//# sourceMappingURL=auth-admin.decorators.js.map