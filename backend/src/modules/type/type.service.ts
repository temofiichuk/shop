import { Injectable } from "@nestjs/common";
import { CreateTypeInput } from "./dto/create-type.input";
import { UpdateTypeInput } from "./dto/update-type.input";
import slugify from "slugify";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class TypeService {
	constructor(private readonly prisma: PrismaService) {}

	create(createTypeInput: CreateTypeInput) {
		return this.prisma.type.create({
			data: {
				...createTypeInput,
				slug: slugify(createTypeInput.name, { lower: true }),
			},
		});
	}

	update(id: number, updateTypeInput: UpdateTypeInput) {
		return this.prisma.type.update({
			where: { id },
			data: {
				...updateTypeInput,
				slug: slugify(updateTypeInput.name, { lower: true }),
			},
		});
	}

	remove(id: number) {
		return this.prisma.type.delete({ where: { id } });
	}

	findAll(group_id: number) {
		return this.prisma.type.findMany({ where: { group_id } });
	}

	findOne(id: number) {
		return this.prisma.type.findFirst({ where: { id } });
	}
}
