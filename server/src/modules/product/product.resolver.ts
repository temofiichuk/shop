import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { Product } from "./entities/product.entity";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { IsAdminAuth } from "../auth/decorators/auth-admin.decorators";
import { ProductCount } from "./entities/products-count.entity";
import { PaginationInput } from "../../services/pagination/dto/pagination.input";
import { FilterProductInput } from "./dto/filter-product.input";

@Resolver(() => Product)
export class ProductResolver {
	constructor(private readonly productService: ProductService) {
	}

	@Mutation(() => Product)
	@IsAdminAuth()
	async createProduct(@Args("data") data: CreateProductInput) {
		return this.productService.create(data);
	}

	@Query(() => [Product])
	async products(
		@Args("pagination", { nullable: true }) pagination?: PaginationInput,
		@Args("filter", { nullable: true }) filter?: FilterProductInput) {
		return this.productService.findAll({ pagination, filter });
	}

	@Query(() => ProductCount)
	async productsCount() {
		return this.productService.count();
	}

	@Query(() => Product)
	async product(@Args("id", { type: () => Int }) id: number) {
		return this.productService.findOne(id);
	}

	@Mutation(() => Product)
	@IsAdminAuth()
	async updateProduct(@Args("data") data: UpdateProductInput) {
		return this.productService.update(data);
	}

	@Mutation(() => Product)
	@IsAdminAuth()
	async deleteProduct(@Args("id", { type: () => Int }) id: number) {
		return this.productService.remove(id);
	}
}
