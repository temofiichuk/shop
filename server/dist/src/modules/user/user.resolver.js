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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./entities/user.entity");
const create_user_input_1 = require("./dto/create-user.input");
const update_user_input_1 = require("./dto/update-user.input");
const common_1 = require("@nestjs/common");
const custom_validation_pipe_1 = require("../../pipes/custom-validation.pipe");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const current_user_decorators_1 = require("../auth/decorators/current-user.decorators");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    userCreate(createUserInput) {
        return this.userService.create(createUserInput);
    }
    userUpdate(id, updateUserInput) {
        return this.userService.update(id, updateUserInput);
    }
    userRemove(id) {
        return this.userService.remove(id);
    }
    userById(id) {
        return this.userService.getById(id);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    (0, common_1.UsePipes)(custom_validation_pipe_1.CustomValidationPipe),
    __param(0, (0, graphql_1.Args)("createUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "userCreate", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    (0, common_1.UsePipes)(custom_validation_pipe_1.CustomValidationPipe),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, current_user_decorators_1.CurrentUser)("id")),
    __param(1, (0, graphql_1.Args)("updateUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "userUpdate", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "userRemove", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "userById", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map