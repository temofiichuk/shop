"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const auth_data_entity_1 = require("./entities/auth-data.entity");
const common_1 = require("@nestjs/common");
const custom_validation_pipe_1 = require("../../pipes/custom-validation.pipe");
const login_user_input_1 = require("./dto/login-user.input");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    authLogin(loginInput) {
        return this.authService.login(loginInput);
    }
    authNewTokens(refresh_token) {
        return this.authService.getNewTokens(refresh_token);
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Query)(() => auth_data_entity_1.AuthData),
    (0, common_1.UsePipes)(custom_validation_pipe_1.CustomValidationPipe),
    __param(0, (0, graphql_1.Args)("loginInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_input_1.LoginUserInput]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "authLogin", null);
__decorate([
    (0, graphql_1.Query)(() => auth_data_entity_1.AuthData),
    __param(0, (0, graphql_1.Args)("refresh_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "authNewTokens", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map