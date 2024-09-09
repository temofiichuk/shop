import { Injectable } from "@nestjs/common";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";
import { PrismaService } from "../../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class OrderService {
	constructor(private readonly prisma: PrismaService) {
	}

	async create({ order_items, ...data }: CreateOrderInput) {
		return this.prisma.order.create({
			data: {
				...data,
				order_items: {
					create: order_items,
				},
			},
		});
	}

	async findAll(where?: Prisma.OrderWhereInput) {
		return this.prisma.order.findMany({
			orderBy: {
				created_at: "desc" as Prisma.SortOrder,
			},
			include: {
				order_items: true,
				user: true,
			},
			where,
		});
	}

	async findOne(id: number) {
		return this.prisma.order.findUnique({
			where: { id },
			include: {
				order_items: {
					include: {
						product_variant: {
							include: {
								variant_attribute_values: true,
							},
						},
					},
				},
				user: true,
			},
		});
	}

	async update({ order_items, ...data }: UpdateOrderInput) {
		return this.prisma.order.update({
			where: { id: data.id },
			data: { ...data },
			select: {
				id: true,
			},
		});
	}

	async remove(id: number) {
		return this.prisma.order.delete({
			where: { id },
		});
	}

}
