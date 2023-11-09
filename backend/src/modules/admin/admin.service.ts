import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { hash } from "argon2";
import { CreateAdminInput } from "./dto/create-admin.input";
import { UpdateAdminInput } from "./dto/update-admin.input";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.admin.findMany();
  }

  async getById(id: number) {
    return this.prisma.admin.findUnique({ where: { id } });
  }

  async create(createAdminInput: CreateAdminInput) {
    const isAdminExists = await this.prisma.admin.findUnique({
      where: { email: createAdminInput.email },
    });
    if (isAdminExists) {
      throw new HttpException(
        { message: "Admin already exists" },
        HttpStatus.BAD_REQUEST
      );
    }
    createAdminInput.password = await hash(createAdminInput.password);
    const admin = await this.prisma.admin.create({ data: createAdminInput });
    if (!admin) throw new BadGatewayException("Admin not created");

    return { message: "Admin was created" };
  }

  async update(id: number, updateAdminInput: UpdateAdminInput) {
    const availableUser = await this.prisma.admin.findUnique({
      where: { email: updateAdminInput.email },
    });
    if (availableUser && availableUser.id !== id) {
      throw new BadGatewayException("Admin with this email already exists");
    }
    const admin = await this.prisma.admin.update({
      where: { id },
      data: updateAdminInput,
    });
    if (!admin) throw new BadGatewayException("Admin wasn't updated");
    throw new HttpException({ message: "Admin was updated" }, HttpStatus.OK);
  }

  async remove(id: number) {
    const admin = await this.prisma.admin.delete({
      where: { id },
    });
    if (!admin) throw new BadGatewayException("Admin wasn't deleted");
    throw new HttpException({ message: "Admin was deleted" }, HttpStatus.OK);
  }
}
