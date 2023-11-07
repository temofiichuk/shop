import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { verify } from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginUserInput } from "./dto/login-user.input";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(data: LoginUserInput) {
    const availableUser = await this.getUser({ email: data.email });
    if (!availableUser) throw new NotFoundException("User Not Found");

    const isPasswordCorrect = await verify(
      data.password,
      availableUser.password
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException("Password Incorrect");
    }

    return await this.getAuthFields(availableUser);
  }

  async getNewTokens(refreshToken: string) {
    const isVerifiedToken = await this.jwt.verifyAsync(refreshToken);
    if (!isVerifiedToken) throw new UnauthorizedException("Token Incorrect");

    const user = await this.getUser({ id: isVerifiedToken.id });
    return await this.getAuthFields(user);
  }

  private async getUser(param: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where: param });
  }

  private async getAuthFields({ id, email, name }: User) {
    return {
      user: { id, email, name },
      ...(await this.createNewTokens(id)),
    };
  }

  private async createNewTokens(userID: number) {
    const accessToken = await this.jwt.signAsync(
      { id: userID },
      { expiresIn: this.configService.get("LIFECYCLE_ACCESS_TOKEN") }
    );

    const refreshToken = await this.jwt.signAsync(
      { id: userID },
      { expiresIn: this.configService.get("LIFECYCLE_REFRESH_TOKEN") }
    );

    return { accessToken, refreshToken };
  }
}
