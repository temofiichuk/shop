import { Field, InputType, Int, registerEnumType } from "@nestjs/graphql";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

import { EnumReviewStatus } from "@prisma/client";

registerEnumType(EnumReviewStatus, {
	name: "EnumReviewStatus",
});

@InputType()
export class CreateReviewInput {
	@Field()
	@IsNotEmpty()
	@IsString()
	@Min(5, { message: "There must be at least 5 characters" })
	comment: string;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	product_id?: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	user_id?: number;

	@Field(() => EnumReviewStatus)
	@IsEnum(EnumReviewStatus)
	@IsOptional()
	status?: EnumReviewStatus;
}
