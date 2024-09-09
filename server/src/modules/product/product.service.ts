import { Injectable } from "@nestjs/common";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { PrismaService } from "../../prisma.service";
import { PaginationInput } from "../../services/pagination/dto/pagination.input";
import { PaginationService } from "../../services/pagination/pagination.service";
import { FilterProductInput } from "./dto/filter-product.input";

@Injectable()
export class ProductService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly pagination: PaginationService) {
	}

	async create(data: CreateProductInput) {
		return this.prisma.product.create({ data });
	}

	async findAll({ pagination, filter }: {
		pagination?: PaginationInput, filter?: FilterProductInput
	}) {
		const page = this.pagination.getPagination(pagination.take, pagination.page);
		return this.prisma.product.findMany({
			where: filter,
			include: {
				reviews: true,
				variants: true,
				categories: true,
				images: true,
				promotions: true,
			},
			...page,
		});
	}

	async count() {
		return { count: await this.prisma.product.count() };
	}

	async findOne(id: number) {
		return this.prisma.product.findUnique({
			where: { id },
			include: {
				reviews: true,
				variants: true,
				categories: true,
				images: true,
				promotions: true,
			},
		});
	}

	async update(data: UpdateProductInput) {
		return this.prisma.product.update({
			where: { id: data.id },
			data,
		});
	}

	async remove(id: number) {
		return this.prisma.product.delete({
			where: { id },
		});
	}
}
