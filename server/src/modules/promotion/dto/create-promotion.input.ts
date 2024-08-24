import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { EnumDiscountType } from "@prisma/client";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

registerEnumType(EnumDiscountType, {
	name: "EnumDiscountType",
});

@InputType()
export class CreatePromotionInput {
	@Field()
	@IsNotEmpty()
	@IsString()
	@Min(3, { message: "There must be at least 3 characters" })
	name: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	@Min(5, { message: "Must be at least 5 characters" })
	description?: string;

	@Field(() => EnumDiscountType)
	@IsEnum(EnumDiscountType)
	@IsNotEmpty()
	discount_type: EnumDiscountType;

	@Field(() => Date)
	@IsDate()
	@IsNotEmpty()
	start_date: Date;

	@Field(() => Date)
	@IsDate()
	@IsNotEmpty()
	end_data: Date;
}