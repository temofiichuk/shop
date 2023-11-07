import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { hash } from "argon2";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const availableUser = await this.prisma.user.findUnique({
      where: { email: createUserInput.email },
    });
    if (availableUser) throw new BadGatewayException("User already exists");

    createUserInput.password = await hash(createUserInput.password);
    const user = await this.prisma.user.create({ data: createUserInput });
    if (!user) throw new BadGatewayException("User not created");

    return new HttpException(
      { message: "User was created" },
      HttpStatus.CREATED
    );
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
