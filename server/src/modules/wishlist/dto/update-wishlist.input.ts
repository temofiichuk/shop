import { CreateWishlistInput } from "./create-wishlist.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateWishlistInput extends PartialType(CreateWishlistInput) {
	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	id: number;
}
