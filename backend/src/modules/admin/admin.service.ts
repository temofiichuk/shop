import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { hash } from "argon2";
import { CreateAdminInput } from "./dto/create-admin.input";
import { UpdateAdminInput } from "./dto/update-admin.input";
import { EnumAdminType, Prisma } from "@prisma/client";
import { adminFieldsOutput, AdminOutputType } from "./dto/admin.output";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.admin.findMany({ select: adminFieldsOutput });
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
    return this.prisma.admin.create({
      data: createAdminInput,
      select: adminFieldsOutput,
    });
  }

  async update(updateAdminInput: UpdateAdminInput, admin: AdminOutputType) {
    await this.checkEmail(updateAdminInput);
    if (
      admin?.type !== EnumAdminType.ROOTADMIN &&
      admin.id !== +updateAdminInput.id
    ) {
      throw new ForbiddenException(`You can't update fields of other admins`);
    }

    return this.prisma.admin.update({
      where: { id: +updateAdminInput.id },
      data: updateAdminInput,
      select: adminFieldsOutput,
    });
  }

  async remove(id: number, admin: AdminOutputType) {
    if (admin?.type !== EnumAdminType.ROOTADMIN) {
      throw new ForbiddenException(`You can't delete admins`);
    }
    return this.prisma.admin.delete({ where: { id } });
  }

  private async checkEmail({ id, email }: Prisma.AdminWhereUniqueInput) {
    if (!email) return;
    const existsAdmin = await this.prisma.admin.findUnique({
      where: { email },
    });
    if (existsAdmin.id === id) return;
    if (existsAdmin) throw new ConflictException("Email conflict");
  }
}
