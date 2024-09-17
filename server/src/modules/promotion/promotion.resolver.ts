import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PromotionService } from "./promotion.service";
import { Promotion } from "./entities/promotion.entity";
import { CreatePromotionInput } from "./dto/create-promotion.input";
import { UpdatePromotionInput } from "./dto/update-promotion.input";
import { IsAdminAuth } from "../auth/decorators/auth-admin.decorators";

@Resolver(() => Promotion)
export class PromotionResolver {
	constructor(private readonly promotionService: PromotionService) {
	}

	@Mutation(() => Promotion)
	@IsAdminAuth()
	async createPromotion(@Args("data") data: CreatePromotionInput) {
		return this.promotionService.create(data);
	}

	@Query(() => [Promotion])
	async promotions() {
		return this.promotionService.findAll();
	}

	@Query(() => Promotion)
	async promotion(@Args("id", { type: () => Int }) id: number) {
		return this.promotionService.findOne(id);
	}

	@Mutation(() => Promotion)
	@IsAdminAuth()
	async updatePromotion(
		@Args("id", { type: () => Int }) id: number,
		@Args("data") data: UpdatePromotionInput,
	) {
		return this.promotionService.update(id, data);
	}

	@Mutation(() => Promotion)
	@IsAdminAuth()
	async deletePromotion(@Args("id", { type: () => Int }) id: number) {
		return this.promotionService.remove(id);
	}
}
