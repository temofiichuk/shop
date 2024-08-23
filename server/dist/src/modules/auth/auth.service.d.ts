import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginUserInput } from "./dto/login-user.input";
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly configService;
    constructor(prisma: PrismaService, jwt: JwtService, configService: ConfigService);
    login(data: LoginUserInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    }>;
    getNewTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    }>;
    private getUser;
    private getAuthFields;
    private createNewTokens;
}
