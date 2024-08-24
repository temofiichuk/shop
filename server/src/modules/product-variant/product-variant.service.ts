import { Injectable } from "@nestjs/common";
import { CreateProductVariantInput } from "./dto/create-product-variant.input";
import { UpdateProductVariantInput } from "./dto/update-product-variant.input";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class ProductVariantService {
	constructor(private readonly prisma: PrismaService) {
	}

	async create(data: CreateProductVariantInput) {
		return this.prisma.productVariant.create({ data });
	}

	async findAll(product_id?: number) {
		return this.prisma.productVariant.findMany({
			where: { product_id },
			include: {
				product: true,
				attribute: true,
				order_item: true,
				wishlist: true,
			},
		});
	}

	async findOne(id: number) {
		return this.prisma.productVariant.findUnique({
			where: { id },
			include: {
				product: true,
				attribute: true,
				order_item: true,
				wishlist: true,
			},
		});
	}

	async update(id: number, data: UpdateProductVariantInput) {
		return this.prisma.productVariant.update({
			where: { id },
			data,
		});
	}

	async remove(id: number) {
		return this.prisma.productVariant.delete({
			where: { id },
		});
	}
}