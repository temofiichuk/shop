import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";


@InputType()
export class LoginInput {
	@Field()
	// @IsEmail({ }, { message: "Invalid email format" })
	@IsNotEmpty()
	email: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	password: string;
}
