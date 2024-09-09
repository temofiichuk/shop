import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductAttribute } from "./entities/product-attribute.entity";
import { CreateProductAttributeInput } from "./dto/create-product-attribute.input";
import { ProductAttributeService } from "./product-attribute.service";
import { UpdateProductAttributeInput } from "./dto/update-product-attribute.input";

@Resolver(() => ProductAttribute)
export class ProductAttributeResolver {
	constructor(private readonly attributeService: ProductAttributeService) {
	}

	@Mutation(() => ProductAttribute)
	createProductAttributeValue(
		@Args("createData") createData: CreateProductAttributeInput,
	) {
		return this.attributeService.create(createData);
	}

	@Query(() => [ProductAttribute])
	productAttributes() {
		return this.attributeService.findAll();
	}

	@Query(() => ProductAttribute)
	productAttribute(@Args("id", { type: () => Int }) id: number) {
		return this.attributeService.findOne(id);
	}

	@Mutation(() => ProductAttribute)
	updateProductAttributeValue(
		@Args("updateData") updateData: UpdateProductAttributeInput,
	) {
		return this.attributeService.update(updateData.id, updateData);
	}

	@Mutation(() => ProductAttribute)
	removeProductAttributeValue(@Args("id", { type: () => Int }) id: number) {
		return this.attributeService.remove(id);
	}
}
