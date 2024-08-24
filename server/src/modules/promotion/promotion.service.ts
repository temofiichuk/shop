import { Injectable } from "@nestjs/common";
import { CreatePromotionInput } from "./dto/create-promotion.input";
import { UpdatePromotionInput } from "./dto/update-promotion.input";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PromotionService {
	constructor(private readonly prisma: PrismaService) {
	}

	async create(data: CreatePromotionInput) {
		return this.prisma.promotion.create({
			data,
			include: {
				promotions: true,
			},
		});
	}

	async findAll() {
		return this.prisma.promotion.findMany({
			include: {
				promotions: true,
			},
		});
	}

	async findOne(id: number) {
		return this.prisma.promotion.findUnique({
			where: { id },
			include: {
				promotions: true,
			},
		});
	}

	async update(id: number, data: UpdatePromotionInput) {
		return this.prisma.promotion.update({
			where: { id },
			data,
		});
	}

	async remove(id: number) {
		return this.prisma.promotion.delete({
			where: { id },
		});
	}
}