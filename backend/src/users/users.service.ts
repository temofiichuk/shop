import { Injectable } from "@nestjs/common";
import { PrismaService } from "../app.service";
import { CreateUserInput } from "../graphql.schema";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getAll = async () => this.prisma.user.findMany();

  find = async (id: number) =>
    this.prisma.user.findUnique({
      where: { id },
    });

  create = async (data: CreateUserInput) =>
    this.prisma.user.create({
      data,
    });
}
