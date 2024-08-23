import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";


@InputType()
export class LoginAdminInput {
	@Field()
	@IsEmail({}, { message: "Invalid email format" })
	@IsNotEmpty()
	email: string;

	@Field()
	@IsNotEmpty()
	password: string;
}
