import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProductAttribute } from "../../product-attribute/entities/product-attribute.entity";

@ObjectType()
export class ProductAttributeValue {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	value: string;

	@Field(() => ProductAttribute)
	product_attribute: ProductAttribute;

	@Field(() => Int)
	product_attribute_id: number;

	@Field(() => Date)
	created_at: Date;

	@Field(() => Date)
	updated_at: Date;
}