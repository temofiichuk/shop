import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductCategoryService } from "./product-category.service";
import { ProductCategory } from "./entities/product-category.entity";
import { CreateProductCategoryInput } from "./dto/create-product-category.input";
import { UpdateProductCategoryInput } from "./dto/update-product-category.input";
import { IsAdminAuth } from "../auth-admin/decorators/auth.decorators";

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
	constructor(private readonly productCategoryService: ProductCategoryService) {
	}

	@Query(() => [ProductCategory])
	async productCategories() {
		return this.productCategoryService.findAll();
	}

	@Query(() => ProductCategory)
	async productCategory(@Args("id", { type: () => Int }) id: number) {
		return this.productCategoryService.findOne(id);
	}

	@Mutation(() => ProductCategory)
	@IsAdminAuth()
	async createProductCategory(@Args("data") data: CreateProductCategoryInput) {
		return this.productCategoryService.create(data);
	}

	@Mutation(() => ProductCategory)
	@IsAdminAuth()
	async updateProductCategory(@Args("data") data: UpdateProductCategoryInput) {
		return this.productCategoryService.update(data.id, data);
	}

	@Mutation(() => ProductCategory)
	@IsAdminAuth()
	async deleteProductCategory(@Args("id", { type: () => Int }) id: number) {
		return this.productCategoryService.remove(id);
	}
}