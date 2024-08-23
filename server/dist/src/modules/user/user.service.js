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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../../prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserInput) {
        const availableUser = await this.prisma.user.findUnique({
            where: { email: createUserInput.email },
        });
        if (availableUser)
            throw new common_1.BadGatewayException("User already exists");
        createUserInput.password = await (0, argon2_1.hash)(createUserInput.password);
        const user = await this.prisma.user.create({ data: createUserInput });
        if (!user)
            throw new common_1.BadGatewayException("User not created");
        return { message: "User was created" };
    }
    async getById(id, selects = {}) {
        const users = await this.prisma.user.findUnique({
            where: { id: id },
            select: {
                ...selects,
            },
        });
        if (!users)
            throw new common_1.BadGatewayException("Users not found");
        return users;
    }
    async update(id, updateUserInput) {
        const availableUser = await this.prisma.user.findUnique({
            where: { email: updateUserInput.email },
        });
        if (availableUser && availableUser.id !== id) {
            throw new common_1.BadGatewayException("User with this email already exists");
        }
        const user = await this.prisma.user.update({
            where: { id },
            data: updateUserInput,
        });
        if (!user)
            throw new common_1.BadGatewayException("User wasn't update");
        return new common_1.HttpException({ message: "User was updated" }, common_1.HttpStatus.OK);
    }
    async remove(id) {
        const user = await this.prisma.user.delete({
            where: { id },
        });
        if (!user)
            throw new common_1.BadGatewayException("User wasn't deleted");
        return new common_1.HttpException({ message: "User was deleted" }, common_1.HttpStatus.OK);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map