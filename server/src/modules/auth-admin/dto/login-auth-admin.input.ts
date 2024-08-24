import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


@InputType()
export class LoginAdminInput {
	@Field()
	@IsEmail({}, { message: "Invalid email format" })
	@IsNotEmpty()
	email: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	password: string;
}
