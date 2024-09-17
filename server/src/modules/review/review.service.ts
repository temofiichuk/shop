import { Injectable } from "@nestjs/common";
import { CreateReviewInput } from "./dto/create-review.input";
import { UpdateReviewInput } from "./dto/update-review.input";
import { PrismaService } from "../../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ReviewService {
	constructor(private readonly prisma: PrismaService) {
	}

	async create(data: CreateReviewInput, user_id: number) {
		return this.prisma.review.create({
			data: { ...data, user_id },
			include: {
				product: true,
				user: true,
			},
		});
	}

	async findAll() {
		return this.prisma.review.findMany({
			include: {
				product: true,
				user: true,
			},
			orderBy: [
				{
					created_at: "desc" as Prisma.SortOrder,
				},
				{
					status: "desc" as Prisma.SortOrder,
				}],
		});
	}

	async findOne(id: number) {
		return this.prisma.review.findUnique({
			where: { id },
			include: {
				product: true,
				user: true,
			},
		});
	}

	async update(id: number, data: UpdateReviewInput) {
		return this.prisma.review.update({
			where: { id },
			data,
		});
	}

	async remove(id: number) {
		return this.prisma.review.delete({
			where: { id },
		});
	}
}
