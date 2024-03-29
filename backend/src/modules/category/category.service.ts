import { Injectable } from "@nestjs/common";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { PrismaService } from "../../prisma.service";

import slugify from "slugify";
import { Category, Subcategory } from "@prisma/client";

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createCategoryInput: CreateCategoryInput) {
		return this.prisma.category.create({
			data: {
				...createCategoryInput,
				slug: slugify(createCategoryInput.name, { lower: true }),
			},
		});
	}

	async findAll() {
		return this.prisma.category.findMany({ include: { subcategories: true } });
	}

	async getAllWith() {
		return this.prisma.$transaction(async (prisma) => {
			let navigation = {};
			const categories = await prisma.category.findMany();
			const subcategories = await prisma.subcategory.findMany();
		});
	}

	async findOne(name: string) {
		return this.prisma.category.findFirst({
			where: {
				name: {
					contains: name,
				},
			},
		});
	}

	async update(id: number, updateCategoryInput: UpdateCategoryInput) {
		return this.prisma.category.update({
			where: { id },
			data: {
				...updateCategoryInput,
				slug: slugify(updateCategoryInput.name, { lower: true }),
			},
		});
	}

	async remove(id: number) {
		return this.prisma.category.delete({ where: { id } });
	}
}
