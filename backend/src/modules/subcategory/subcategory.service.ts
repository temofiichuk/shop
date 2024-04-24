import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CreateSubcategoryInput } from "./dto/create-subcategory.input";
import slugify from "slugify";
import { UpdateSubcategoryInput } from "./dto/update-subcategory.input";

@Injectable()
export class SubcategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async create({ category_id, ...rest }: CreateSubcategoryInput) {
		return this.prisma.subcategory.create({
			data: {
				...rest,
				slug: slugify(rest.name, { lower: true }),
				category_id,
			},
		});
	}

	async update(id: number, updateSubcategoryInput: UpdateSubcategoryInput) {
		return this.prisma.subcategory.update({
			where: { id },
			data: {
				...updateSubcategoryInput,
				slug: slugify(updateSubcategoryInput.name, { lower: true }),
			},
		});
	}

	async remove(id: number) {
		return this.prisma.subcategory.delete({ where: { id } });
	}

	async findAll(category_id: number) {
		return this.prisma.subcategory.findMany({ where: { category_id } });
	}

	async findOne(id: number) {
		return this.prisma.subcategory.findFirst({ where: { id } });
	}
}
