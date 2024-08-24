import { BadGatewayException, Injectable } from "@nestjs/common";
import { CreateWishlistInput } from "./dto/create-wishlist.input";
import { UpdateWishlistInput } from "./dto/update-wishlist.input";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class WishlistService {
	constructor(private readonly prisma: PrismaService) {
	}

	async add(data: CreateWishlistInput) {
		if (!data.product_id && !data.product_variant_id) {
			throw new BadGatewayException("No product id found");
		}
		return this.prisma.wishlist.create({
			data,
			include: {
				product: true,
				product_variant: true,
				user: true,
			},
		});
	}

	async findAll(user_id?: number) {
		return this.prisma.wishlist.findMany({
			where: { user_id },
			include: {
				product: true,
				product_variant: true,
				user: true,
			},
		});
	}

	async findOne(id: number) {
		return this.prisma.wishlist.findUnique({
			where: { id },
			include: {
				product: true,
				product_variant: true,
				user: true,
			},
		});
	}

	async update(id: number, data: UpdateWishlistInput) {
		return this.prisma.wishlist.update({
			where: { id },
			data,
		});
	}

	async remove(id: number) {
		return this.prisma.wishlist.delete({
			where: { id },
		});
	}
}
