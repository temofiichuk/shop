import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { hash } from "argon2";
import { CreateAdminInput } from "./dto/create-admin.input";
import { UpdateAdminInput } from "./dto/update-admin.input";
import { Admin, EnumAdminType, Prisma } from "@prisma/client";
import { adminFieldsOutput, AdminOutputType } from "./dto/admin.output";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.admin.findMany();
  }

  async getById(id: number) {
    return this.prisma.admin.findUnique({
      where: { id },
      select: adminFieldsOutput,
    });
  }

  async create(createAdminInput: CreateAdminInput) {
    await this.checkEmail(createAdminInput);
    createAdminInput.password = await hash(createAdminInput.password);
    await this.prisma.admin.create({ data: createAdminInput });
    throw new HttpException({ message: "Admin was created" }, HttpStatus.OK);
  }

  async update(updateAdminInput: UpdateAdminInput, admin: AdminOutputType) {
    await this.checkEmail(updateAdminInput);
    if (
      admin?.type !== EnumAdminType.ROOTADMIN &&
      admin.id !== +updateAdminInput.id
    ) {
      throw new ForbiddenException(`You can't update fields of other admins`);
    }

    let user = null;
    try {
      user = await this.prisma.admin.update({
        where: { id: +updateAdminInput.id },
        data: updateAdminInput,
        select: adminFieldsOutput,
      });
    } catch (e) {
      throw new HttpException(
        { message: "Something went wrong" },
        HttpStatus.BAD_REQUEST
      );
    }
    return user;
  }

  async remove(id: number, admin: AdminOutputType) {
    if (admin?.type !== EnumAdminType.ROOTADMIN) {
      throw new ForbiddenException(`You can't delete admins`);
    }
    let deletedAdmin = null;
    try {
      deletedAdmin = await this.prisma.admin.delete({
        where: { id },
      });
    } catch (e) {
      throw new HttpException(
        { message: "Something went wrong" },
        HttpStatus.BAD_REQUEST
      );
    }
    return deletedAdmin;
  }

  private async checkEmail({ email }: Prisma.AdminWhereUniqueInput) {
    if (!email) return;
    const existsAdmin = await this.prisma.admin.findUnique({
      where: { email },
    });
    if (existsAdmin) {
      throw new HttpException(
        { message: "Admin with this email already exists" },
        HttpStatus.CONFLICT
      );
    }
  }
}
