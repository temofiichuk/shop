import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { Order } from "./entities/order.entity";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";
import { IsAdminAuth } from "../auth-admin/decorators/auth.decorators";

@Resolver(() => Order)
export class OrderResolver {
	constructor(private readonly orderService: OrderService) {
	}

	@Mutation(() => Order)
	async createOrder(@Args("data") data: CreateOrderInput) {
		return this.orderService.create(data);
	}

	@Query(() => [Order])
	@IsAdminAuth()
	async orders() {
		return this.orderService.findAll();
	}

	@Query(() => Order)
	async order(@Args("id", { type: () => Int }) id: number) {
		return this.orderService.findOne(id);
	}

	@Mutation(() => Order)
	async updateOrder(@Args("data") data: UpdateOrderInput) {
		return this.orderService.update(data);
	}

	@Mutation(() => Order)
	async deleteOrder(@Args("id", { type: () => Int }) id: number) {
		return this.orderService.remove(id);
	}
}