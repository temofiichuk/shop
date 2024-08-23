export declare class UserAuthData {
    id: number;
    username: string;
    email: string;
}
export declare class AuthData {
    user: UserAuthData;
    accessToken: string;
    refreshToken: string;
}
