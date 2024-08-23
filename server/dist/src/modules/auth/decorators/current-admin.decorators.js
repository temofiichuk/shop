"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAdmin = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const graphql_1 = require("@nestjs/graphql");
exports.CurrentAdmin = (0, common_1.createParamDecorator)((select, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (req.user.role === client_1.EnumAdminRole.ADMIN)
        return select ? req.user[select] : req.user;
});
//# sourceMappingURL=current-admin.decorators.js.map