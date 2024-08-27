import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductVariantService } from "./product-variant.service";
import { ProductVariant } from "./entities/product-variant.entity";
import { CreateProductVariantInput } from "./dto/create-product-variant.input";
import { UpdateProductVariantInput } from "./dto/update-product-variant.input";
import { IsAdminAuth } from "../auth/decorators/auth-admin.decorators";

@Resolver(() => ProductVariant)
export class ProductVariantResolver {
	constructor(private readonly productVariantService: ProductVariantService) {
	}

	@Mutation(() => ProductVariant)
	@IsAdminAuth()
	createProductVariant(@Args("createProductVariantInput") createProductVariantInput: CreateProductVariantInput) {
		return this.productVariantService.create(createProductVariantInput);
	}

	@Query(() => [ProductVariant])
	productVariants(@Args("product_id") product_id?: number) {
		return this.productVariantService.findAll(product_id);
	}

	@Query(() => ProductVariant)
	productVariant(@Args("id", { type: () => Int }) id: number) {
		return this.productVariantService.findOne(id);
	}

	@Mutation(() => ProductVariant)
	@IsAdminAuth()
	updateProductVariant(@Args("updateProductVariantInput") updateProductVariantInput: UpdateProductVariantInput) {
		return this.productVariantService.update(updateProductVariantInput.id, updateProductVariantInput);
	}

	@Mutation(() => ProductVariant)
	@IsAdminAuth()
	removeProductVariant(@Args("id", { type: () => Int }) id: number) {
		return this.productVariantService.remove(id);
	}
}
