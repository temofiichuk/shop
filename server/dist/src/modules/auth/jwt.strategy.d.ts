import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";
import { UserService } from "../user/user.service";
type ValidationPayloadType = {
    id: number;
};
declare const JwtAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAuthStrategy extends JwtAuthStrategy_base {
    private configService;
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate({ id }: ValidationPayloadType): Promise<User>;
}
export {};
