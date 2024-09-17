import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { ProductAttributeValue } from "./entities/product-attribute-value.entity";
import { ProductAttributeValueService } from "./product-attribute-value.service";
import { CreateProductAttributeValueInput } from "./dto/create-product-attribute-value.input";
import { UpdateProductAttributeValueInput } from "./dto/update-product-attribute-value.input";

@Resolver(() => ProductAttributeValue)
export class ProductAttributeValueResolver {
	constructor(private readonly attributeValueService: ProductAttributeValueService) {
	}

	@Mutation(() => ProductAttributeValue)
	createProductAttributeValue(
		@Args("createData") createData: CreateProductAttributeValueInput,
	) {
		return this.attributeValueService.create(createData);
	}

	@Mutation(() => ProductAttributeValue)
	updateProductAttributeValue(
		@Args("updateData") updateData: UpdateProductAttributeValueInput,
	) {
		return this.attributeValueService.update(updateData.id, updateData);
	}

	@Mutation(() => ProductAttributeValue)
	removeProductAttributeValue(@Args("id", { type: () => Int }) id: number) {
		return this.attributeValueService.remove(id);
	}
}
