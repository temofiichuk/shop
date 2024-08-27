import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { OrderItemService } from "./order-item.service";
import { OrderItem } from "./entities/order-item.entity";
import { CreateOrderItemInput } from "./dto/create-order-item.input";
import { UpdateOrderItemInput } from "./dto/update-order-item.input";
import { IsAdminAuth } from "../auth/decorators/auth-admin.decorators";

@Resolver(() => OrderItem)
export class OrderItemResolver {
	constructor(private readonly orderItemService: OrderItemService) {
	}

	@Mutation(() => OrderItem)
	async createOrderItem(@Args("data") data: CreateOrderItemInput) {
		return this.orderItemService.create(data);
	}

	@Query(() => [OrderItem])
	@IsAdminAuth()
	async orderItems() {
		return this.orderItemService.findAll();
	}

	@Query(() => OrderItem)
	async orderItem(@Args("id", { type: () => Int }) id: number) {
		return this.orderItemService.findOne(id);
	}

	@Mutation(() => OrderItem)
	@IsAdminAuth()
	async updateOrderItem(@Args("data") data: UpdateOrderItemInput) {
		return this.orderItemService.update(data);
	}

	@Mutation(() => OrderItem)
	@IsAdminAuth()
	async deleteOrderItem(@Args("id", { type: () => Int }) id: number) {
		return this.orderItemService.remove(id);
	}
}
