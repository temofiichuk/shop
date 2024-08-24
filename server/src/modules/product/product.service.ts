import { Injectable } from "@nestjs/common";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {
	}

	async create(data: CreateProductInput) {
		return this.prisma.product.create({ data });
	}

	async findAll() {
		return this.prisma.product.findMany({
			include: {
				reviews: true,
				admin: true,
				variants: true,
				categories: true,
				images: true,
				promotions: true,
				wishlist: true,
			},
		});
	}

	async findOne(id: number) {
		return this.prisma.product.findUnique({
			where: { id },
			include: {
				reviews: true,
				admin: true,
				variants: true,
				categories: true,
				images: true,
				promotions: true,
				wishlist: true,
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
