import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserInput } from "../graphql.schema";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async find(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: CreateUserInput) {
    return this.prisma.user.create({
      data,
    });
  }

  // async update(id: number, data: { name: string }) {
  //   return this.prisma.user.update({
  //     where: { id },
  //     data,
  //   });
  // }
  //
  // async remove(id: number) {
  //   return this.prisma.user.delete({
  //     where: { id },
  //   });
  // }
}
