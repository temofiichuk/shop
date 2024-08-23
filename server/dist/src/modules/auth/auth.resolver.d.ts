import { AuthService } from "./auth.service";
import { LoginUserInput } from "./dto/login-user.input";
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    authLogin(loginInput: LoginUserInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    }>;
    authNewTokens(refresh_token: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    }>;
}
