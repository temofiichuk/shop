import { BadGatewayException, Injectable } from "@nestjs/common";
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
		const availableUsers = await this.prisma.user.findMany({
			where: { OR: [{ email: createUserInput.email }, { username: createUserInput.username }] },
		});
		if (!!availableUsers.length) throw new BadGatewayException("User with this username or email already exists");

		createUserInput.password = await hash(createUserInput.password);

		try {
			return await this.prisma.user.create({ data: createUserInput });
		} catch (e) {
			throw new BadGatewayException("User not created", { cause: e });
		}
	}

	async getById(id: number, select: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: { id: id },
			select,
		});
		if (!user) throw new BadGatewayException("User not found");
		return user;
	}

	async update(id: number, updateUserInput: UpdateUserInput) {
		const availableUsers = await this.prisma.user.findMany({
			where: {
				OR: [
					{ email: updateUserInput.email },
					{ username: updateUserInput.username },
				],
			},
			select: { id: true },
		});
		if (!!availableUsers.length) {
			throw new BadGatewayException(`User with this username or email already exists`);
		}
		try {
			return await this.prisma.user.update({
				where: { id },
				data: updateUserInput,
			});
		} catch (e) {
			throw new BadGatewayException("User wasn't update", { cause: e });
		}
	}

	async remove(current_user_id: number) {
		try {
			return await this.prisma.user.delete({ where: { id: current_user_id } });
		} catch (e) {
			throw new BadGatewayException("User wasn't deleted", { cause: e });
		}
	}
}
