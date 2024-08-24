import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CreateProductCategoryInput } from "./dto/create-product-category.input";
import { UpdateProductCategoryInput } from "./dto/update-product-category.input";

@Injectable()
export class ProductCategoryService {
	constructor(private readonly prisma: PrismaService) {
	}

	async findAll() {
		return this.prisma.productCategory.findMany({
			include: {
				product: true,
				category: true,
			},
		});
	}

	async findOne(id: number) {
		return this.prisma.productCategory.findUnique({
			where: { id },
			include: {
				product: true,
				category: true,
			},
		});
	}

	async create(data: CreateProductCategoryInput) {
		return this.prisma.productCategory.create({
			data,
		});
	}

	async update(id: number, data: UpdateProductCategoryInput) {
		return this.prisma.productCategory.update({
			where: { id },
			data,
		});
	}

	async remove(id: number) {
		return this.prisma.productCategory.delete({
			where: { id },
		});
	}
}
