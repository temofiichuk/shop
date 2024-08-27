import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductPromotionService } from "./product-promotion.service";
import { ProductPromotion } from "./entities/product-promotion.entity";
import { CreateProductPromotionInput } from "./dto/create-product-promotion.input";
import { UpdateProductPromotionInput } from "./dto/update-product-promotion.input";
import { IsAdminAuth } from "../auth/decorators/auth-admin.decorators";

@Resolver(() => ProductPromotion)
export class ProductPromotionResolver {
	constructor(private readonly productPromotionService: ProductPromotionService) {
	}

	@Mutation(() => ProductPromotion)
	@IsAdminAuth()
	async createProductPromotion(@Args("data") data: CreateProductPromotionInput) {
		return this.productPromotionService.create(data);
	}

	@Query(() => [ProductPromotion])
	async productPromotions() {
		return this.productPromotionService.findAll();
	}

	@Query(() => ProductPromotion)
	async productPromotion(@Args("id", { type: () => Int }) id: number) {
		return this.productPromotionService.findOne(id);
	}

	@Mutation(() => ProductPromotion)
	@IsAdminAuth()
	async updateProductPromotion(@Args("data") data: UpdateProductPromotionInput) {
		return this.productPromotionService.update(data.id, data);
	}

	@Mutation(() => ProductPromotion)
	@IsAdminAuth()
	async deleteProductPromotion(@Args("id", { type: () => Int }) id: number) {
		return this.productPromotionService.remove(id);
	}
}
