import { CreateProductImageInput } from "./create-product-image.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateProductImageInput extends PartialType(CreateProductImageInput) {
	@Field(() => Int, { nullable: true })
	id?: number;
}
