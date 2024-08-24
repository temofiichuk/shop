import { Injectable } from "@nestjs/common";
import { CreateProductImageInput } from "./dto/create-product-image.input";
import { UpdateProductImageInput } from "./dto/update-product-image.input";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class ProductImageService {
	constructor(private readonly prisma: PrismaService) {
	}

	async create(data: CreateProductImageInput) {
		return this.prisma.productImage.create({
			data,
			include: {
				product: true,
			},
		});
	}

	async findAll(product_id?: number) {
		return this.prisma.productImage.findMany({
			where: { product_id },
			include: {
				product: true,
			},
		});
	}

	async findOne(id: number) {
		return this.prisma.productImage.findUnique({
			where: { id },
			include: {
				product: true,
			},
		});
	}

	async update(id: number, data: UpdateProductImageInput) {
		return this.prisma.productImage.update({
			where: { id },
			data,
		});
	}

	async remove(id: number) {
		return this.prisma.productImage.delete({
			where: { id },
		});
	}
}
