import { BadGatewayException, Injectable } from "@nestjs/common";
import { CreateAdminInput } from "./dto/create-admin.input";
import { UpdateAdminInput } from "./dto/update-admin.input";
import { PrismaService } from "../../prisma.service";
import { hash } from "argon2";
import { Prisma } from "@prisma/client";

@Injectable()
export class AdminService {
	constructor(private prisma: PrismaService) {
	}

	async create(createAdminInput: CreateAdminInput) {
		const availableAdmin = await this.prisma.admin.findUnique({
			where: { email: createAdminInput.email },
		});
		if (availableAdmin) throw new BadGatewayException("Admin with this email already exists");

		createAdminInput.password = await hash(createAdminInput.password);

		try {
			return await this.prisma.admin.create({ data: createAdminInput });
		} catch (e) {
			throw new BadGatewayException("Admin not created", { cause: e });
		}
	}

	async getById(id: number, select: Prisma.AdminSelect = {}) {
		const admin = await this.prisma.admin.findUnique({
			where: { id: id },
			select,
		});
		if (!admin) throw new BadGatewayException("Admin not found");
		return admin;
	}

	async update(id: number, updateAdminInput: UpdateAdminInput) {
		const availableAdmin = await this.prisma.admin.findUnique({
			where: { email: updateAdminInput.email },
			select: { id: true },
		});
		if (availableAdmin) {
			throw new BadGatewayException(`Admin with this username or email already exists`);
		}
		try {
			return await this.prisma.admin.update({
				where: { id },
				data: updateAdminInput,
			});
		} catch (e) {
			throw new BadGatewayException("Admin wasn't update", { cause: e });
		}
	}

	async remove(current_admin_id: number) {
		try {
			return await this.prisma.admin.delete({
				where: { id: current_admin_id },
			});
		} catch (e) {
			throw new BadGatewayException("Admin wasn't deleted", { cause: e });
		}

	}
}
