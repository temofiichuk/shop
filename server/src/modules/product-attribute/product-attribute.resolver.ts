import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductAttributeService } from "./product-attribute.service";
import { ProductAttribute } from "./entities/product-attribute.entity";

@Resolver(() => ProductAttribute)
export class ProductAttributeResolver {
	constructor(private readonly attributeService: ProductAttributeService) {
	}

	// @Mutation(() => ProductAttribute)
	// createProductAttributeValue(
	// 	@Args("data") data: CreateProductAttributeInput,
	// ) {
	// 	return this.attributeService.create(data);
	// }

	@Query(() => [ProductAttribute])
	productAttributes() {
		return this.attributeService.findAll();
	}

	@Query(() => ProductAttribute)
	productAttribute(@Args("id", { type: () => Int }) id: number) {
		return this.attributeService.findOne(id);
	}

	//
	// @Mutation(() => ProductAttribute)
	// updateProductAttributeValue(
	// 	@Args("data") data: UpdateProductAttributeInput,
	// ) {
	// 	return this.attributeService.update(data.id, data);
	// }

	@Mutation(() => ProductAttribute)
	removeProductAttributeValue(@Args("id", { type: () => Int }) id: number) {
		return this.attributeService.remove(id);
	}
}
