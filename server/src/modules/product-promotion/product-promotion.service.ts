import { Injectable } from "@nestjs/common";
import { CreateProductPromotionInput } from "./dto/create-product-promotion.input";
import { UpdateProductPromotionInput } from "./dto/update-product-promotion.input";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class ProductPromotionService {
	constructor(private readonly prisma: PrismaService) {
	}

	async create(data: CreateProductPromotionInput) {
		return this.prisma.productPromotion.create({
			data,
			include: {
				product: true,
				promotion: true,
			},
		});
	}

	async findAll() {
		return this.prisma.productPromotion.findMany({
			include: {
				product: true,
				promotion: true,
			},
		});
	}

	async findOne(id: number) {
		return this.prisma.productPromotion.findUnique({
			where: { id },
			include: {
				product: true,
				promotion: true,
			},
		});
	}

	async update(id: number, data: UpdateProductPromotionInput) {
		return this.prisma.productPromotion.update({
			where: { id },
			data,
		});
	}

	async remove(id: number) {
		return this.prisma.productPromotion.delete({
			where: { id },
		});
	}
}
