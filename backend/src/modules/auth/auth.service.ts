import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { verify } from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginUserInput } from "./dto/login-user.input";
import { Admin, Prisma, User } from "@prisma/client";
import { LoginAdminInput } from "./dto/login-admin.input";

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
      availableUser.password,
      data.password
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException("Password Incorrect");
    }

    return await this.getAuthFields(availableUser);
  }

  async loginAdmin(data: LoginAdminInput) {
    const admin = await this.getAdmin({ email: data.email });
    if (!admin) return new NotFoundException("Admin Not Found");

    const isPasswordCorrect = await verify(admin.password, data.password);

    if (!isPasswordCorrect) {
      return new UnauthorizedException("Password Incorrect");
    }

    return await this.getAuthAdminFields(admin);
  }

  async getNewTokens(refreshToken: string) {
    const isVerifiedToken = await this.jwt.verifyAsync(refreshToken);
    if (!isVerifiedToken) throw new UnauthorizedException("Token Incorrect");

    const isAdmin = isVerifiedToken.type === "admin";
    if (isAdmin) {
      const admin = await this.getAdmin({ id: isVerifiedToken.id });
      return await this.getAuthAdminFields(admin);
    }

    const user = await this.getUser({ id: isVerifiedToken.id });
    return await this.getAuthFields(user);
  }

  private async getUser(param: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where: param });
  }

  private async getAdmin(param: Prisma.AdminWhereUniqueInput) {
    return this.prisma.admin.findUnique({ where: param });
  }

  private async getAuthFields({ id, email, name }: User) {
    return {
      user: { id, email, name },
      ...(await this.createNewTokens(id)),
    };
  }

  private async getAuthAdminFields({ id, name, email, type }: Admin) {
    return {
      admin: { id, name, email, type },
      ...(await this.createNewTokens(id, "admin")),
    };
  }

  private async createNewTokens(id: number, type: string = "user") {
    const accessToken = await this.jwt.signAsync(
      { id, type },
      { expiresIn: this.configService.get("LIFECYCLE_ACCESS_TOKEN") }
    );

    const refreshToken = await this.jwt.signAsync(
      { id, type },
      { expiresIn: this.configService.get("LIFECYCLE_REFRESH_TOKEN") }
    );

    return { accessToken, refreshToken };
  }
}
