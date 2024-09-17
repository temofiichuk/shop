import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Min } from "class-validator";
import {
	CreateProductAttributeValueInput,
} from "../../product-attribute-value/dto/create-product-attribute-value.input";


@InputType()
export class CreateAttributeInput {
	@Field(() => String)
	@IsNotEmpty()
	@IsString()
	@Min(3, { message: "There must be at least 3 characters" })
	name: string;

	@Field(() => [CreateProductAttributeValueInput])
	values: CreateProductAttributeValueInput[];
}