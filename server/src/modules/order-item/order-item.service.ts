import { Injectable } from "@nestjs/common";
import { CreateOrderItemInput } from "./dto/create-order-item.input";
import { UpdateOrderItemInput } from "./dto/update-order-item.input";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class OrderItemService {
	constructor(private readonly prisma: PrismaService) {
	}

	async create(data: CreateOrderItemInput) {
		return this.prisma.orderItem.create({
			data,
		});
	}

	async findAll() {
		return this.prisma.orderItem.findMany();
	}

	async findOne(id: number) {
		return this.prisma.orderItem.findUnique({
			where: { id },
		});
	}

	async update(data: UpdateOrderItemInput) {
		return this.prisma.orderItem.update({
			where: { id: data.id },
			data,
		});
	}

	async remove(id: number) {
		return this.prisma.orderItem.delete({
			where: { id },
		});
	}
}
