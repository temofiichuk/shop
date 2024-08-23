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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const argon2_1 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwt, configService) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.configService = configService;
    }
    async login(data) {
        let availableUser = await this.getUser({ email: data.email });
        if (!availableUser)
            throw new common_1.NotFoundException("User Not Found");
        const isPasswordCorrect = await (0, argon2_1.verify)(availableUser.password, data.password);
        if (!isPasswordCorrect) {
            throw new common_1.UnauthorizedException("Password Incorrect");
        }
        return await this.getAuthFields(availableUser);
    }
    async getNewTokens(refreshToken) {
        const isVerifiedToken = await this.jwt
            .verifyAsync(refreshToken)
            .catch(() => {
            throw new common_1.UnauthorizedException();
        });
        const user = await this.getUser({ id: isVerifiedToken.id });
        return await this.getAuthFields(user);
    }
    async getUser(param) {
        return this.prisma.user.findUnique({ where: param });
    }
    async getAuthFields({ id, email, username }) {
        return {
            user: { id, email, username },
            ...(await this.createNewTokens(id)),
        };
    }
    async createNewTokens(id) {
        const accessToken = await this.jwt.signAsync({ id }, { expiresIn: this.configService.get("LIFECYCLE_ACCESS_TOKEN") });
        const refreshToken = await this.jwt.signAsync({ id }, { expiresIn: this.configService.get("LIFECYCLE_REFRESH_TOKEN") });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map