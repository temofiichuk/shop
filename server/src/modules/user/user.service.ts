import { BadGatewayException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { hash } from "argon2";
import { PrismaService } from "../../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {
	}

	async create(createUserInput: CreateUserInput) {
		const availableUser = await this.prisma.user.findUnique({
			where: { email: createUserInput.email },
		});
		if (availableUser) throw new BadGatewayException("User already exists");

		createUserInput.password = await hash(createUserInput.password);

		const user = await this.prisma.user.create({ data: createUserInput });
		if (!user) throw new BadGatewayException("User not created");

		return { message: "User was created" };
	}

	async getById(id: number, selects: Prisma.UserSelect = {}) {
		const users = await this.prisma.user.findUnique({
			where: { id: id },
			select: {
				...selects,
			},
		});
		if (!users) throw new BadGatewayException("Users not found");
		return users;
	}

	async update(id: number, updateUserInput: UpdateUserInput) {
		const availableUser = await this.prisma.user.findUnique({
			where: { email: updateUserInput.email },
		});
		if (availableUser && availableUser.id !== id) {
			throw new BadGatewayException("User with this email already exists");
		}

		const user = await this.prisma.user.update({
			where: { id },
			data: updateUserInput,
		});
		if (!user) throw new BadGatewayException("User wasn't update");
		return new HttpException({ message: "User was updated" }, HttpStatus.OK);
	}

	async remove(id: number) {
		const user = await this.prisma.user.delete({
			where: { id },
		});
		if (!user) throw new BadGatewayException("User wasn't deleted");
		return new HttpException({ message: "User was deleted" }, HttpStatus.OK);
	}
}
