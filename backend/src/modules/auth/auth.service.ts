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
import { Admin, EnumUserRole, Prisma, User } from "@prisma/client";
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

    return await this.getAuthFields(admin);
  }

  async getNewTokens(refreshToken: string) {
    const isVerifiedToken = await this.jwt
      .verifyAsync(refreshToken)
      .catch(() => {
        throw new UnauthorizedException();
      });
    const isAdmin = isVerifiedToken.role === EnumUserRole.ADMIN;
    if (isAdmin) {
      const admin = await this.getAdmin({ id: isVerifiedToken.id });
      return await this.getAuthFields(admin);
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

  private async getAuthFields({ id, email, name, role }: User | Admin) {
    return {
      user: { id, email, name, role },
      ...(await this.createNewTokens(id, role)),
    };
  }

  private async createNewTokens(id: number, role: EnumUserRole) {
    const accessToken = await this.jwt.signAsync(
      { id, role },
      { expiresIn: this.configService.get("LIFECYCLE_ACCESS_TOKEN") }
    );
    const refreshToken = await this.jwt.signAsync(
      { id, role },
      { expiresIn: this.configService.get("LIFECYCLE_REFRESH_TOKEN") }
    );

    return { accessToken, refreshToken };
  }
}
