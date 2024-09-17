import { Injectable } from "@nestjs/common";
import { UpdateProductVariantInput } from "./dto/update-product-variant.input";
import { PrismaService } from "../../prisma.service";
import { CreateProductVariantInput } from "./dto/create-product-variant.input";

@Injectable()
export class ProductVariantService {
	constructor(private readonly prisma: PrismaService) {
	}


	async create(createData: CreateProductVariantInput) {
		const { variant_attributes, ...data } = createData;
		return this.prisma.productVariant.create({ data });
	}

	async findAll(product_id?: number) {
		return this.prisma.productVariant.findMany({
			where: { product_id },
			include: {
				product: true,
				variant_attributes: true,
				product_image: true,
			},
		});
	}

	async findOne(id: number) {
		return this.prisma.productVariant.findUnique({
			where: { id },
			include: {
				product: true,
				variant_attributes: true,
				product_image: true,
			},
		});
	}

	async update(id: number, createData: UpdateProductVariantInput) {
		const { variant_attributes, ...data } = createData;

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