import { Injectable } from "@nestjs/common";
import { CreateGroupInput } from "./dto/create-group.input";
import { UpdateGroupInput } from "./dto/update-group.input";
import slugify from "slugify";
import { PrismaService } from "../../prisma.service";
import { GraphQLError } from "graphql/error/GraphQLError";

@Injectable()
export class GroupService {
	constructor(private readonly prisma: PrismaService) {}

	create(createGroupInput: CreateGroupInput) {
		return this.prisma.group.create({
			data: {
				...createGroupInput,
				slug: slugify(createGroupInput.name, { lower: true }),
			},
		});
	}

	update(id: number, updateGroupInput: UpdateGroupInput) {
		return this.prisma.group.update({
			where: { id },
			data: {
				...updateGroupInput,
				slug: slugify(updateGroupInput.name, { lower: true }),
			},
		});
	}

	remove(id: number) {
		return this.prisma.group.delete({ where: { id } });
	}

	async findAll(category_id?: number, subcategory_id?: number) {
		if (subcategory_id) {
			return this.prisma.group.findMany({ where: { category_id } });
		}
		if (category_id) {
			return this.prisma.group.findMany({ where: { category_id } });
		}
		console.log(category_id, subcategory_id);
		throw new GraphQLError("There are no arguments");
	}

	findOne(id: number) {
		return this.prisma.group.findFirst({ where: { id } });
	}
}
