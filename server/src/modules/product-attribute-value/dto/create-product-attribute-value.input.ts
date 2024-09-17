import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Min } from "class-validator";
import { Prisma } from "@prisma/client";


@InputType()
export class CreateProductAttributeValueInput implements Prisma.ProductAttributeValueCreateInput {
	@Field(() => String)
	@IsNotEmpty()
	@IsString()
	@Min(3, { message: "There must be at least 3 characters" })
	value: string;
}