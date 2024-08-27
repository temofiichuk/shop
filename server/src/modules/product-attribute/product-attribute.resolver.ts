import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductAttributeService } from "./product-attribute.service";
import { ProductAttribute } from "./entities/product-attribute.entity";
import { CreateProductAttributeInput } from "./dto/create-product-attribute.input";
import { UpdateProductAttributeInput } from "./dto/update-product-attribute.input";
import { IsAdminAuth } from "../auth/decorators/auth-admin.decorators";

@Resolver(() => ProductAttribute)
export class ProductAttributeResolver {
	constructor(private readonly attributeService: ProductAttributeService) {
	}

	@Mutation(() => ProductAttribute)
	@IsAdminAuth()
	createAttribute(@Args("createAttributeInput") data: CreateProductAttributeInput) {
		return this.attributeService.create(data);
	}

	@Query(() => [ProductAttribute], { name: "attribute" })
	findAll() {
		return this.attributeService.findAll();
	}

	@Query(() => ProductAttribute, { name: "attribute" })
	findOne(@Args("id", { type: () => Int }) id: number) {
		return this.attributeService.findOne(id);
	}

	@Mutation(() => ProductAttribute)
	@IsAdminAuth()
	updateAttribute(@Args("updateAttributeInput") data: UpdateProductAttributeInput) {
		return this.attributeService.update(data.id, data);
	}

	@Mutation(() => ProductAttribute)
	@IsAdminAuth()
	removeAttribute(@Args("id", { type: () => Int }) id: number) {
		return this.attributeService.remove(id);
	}
}
