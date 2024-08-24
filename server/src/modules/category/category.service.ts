import { Injectable } from "@nestjs/common";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {
	}

	async create(createCategoryInput: CreateCategoryInput) {
		return this.prisma.category.create({ data: createCategoryInput });
	}

	async findAll() {
		return this.prisma.category.findMany();
	}

	async findOne(id: number) {
		return this.prisma.category.findUnique({
			where: { id },
		});
	}

	async update(id: number, updateCategoryInput: UpdateCategoryInput) {
		return this.prisma.category.update({
			where: { id },
			data: updateCategoryInput,
		});
	}

	async remove(id: number) {
		return this.prisma.category.delete({
			where: { id },
		});
	}
}
