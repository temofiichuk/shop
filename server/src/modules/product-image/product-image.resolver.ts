import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductImageService } from "./product-image.service";
import { ProductImage } from "./entities/product-image.entity";
import { CreateProductImageInput } from "./dto/create-product-image.input";
import { UpdateProductImageInput } from "./dto/update-product-image.input";
import { IsAdminAuth } from "../auth-admin/decorators/auth.decorators";

@Resolver(() => ProductImage)
export class ProductImageResolver {
	constructor(private readonly productImageService: ProductImageService) {
	}

	@Mutation(() => ProductImage)
	@IsAdminAuth()
	async createProductImage(@Args("data") data: CreateProductImageInput) {
		return this.productImageService.create(data);
	}

	@Query(() => [ProductImage])
	async productImages(@Args("product_id") product_id?: number) {
		return this.productImageService.findAll(product_id);
	}

	@Query(() => ProductImage)
	async productImage(@Args("id", { type: () => Int }) id: number) {
		return this.productImageService.findOne(id);
	}

	@Mutation(() => ProductImage)
	@IsAdminAuth()
	async updateProductImage(@Args("data") data: UpdateProductImageInput) {
		return this.productImageService.update(data.id, data);
	}

	@Mutation(() => ProductImage)
	@IsAdminAuth()
	async deleteProductImage(@Args("id", { type: () => Int }) id: number) {
		return this.productImageService.remove(id);
	}
}
