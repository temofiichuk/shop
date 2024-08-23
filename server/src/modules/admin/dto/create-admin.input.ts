import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, Length, Matches } from "class-validator";
import { EnumAdminRole } from "@prisma/client";

@InputType()
export class CreateAdminInput {
	@Field()
	@Matches(/^\p{Lu}\p{Ll}*\b/gu, { message: "Must be Camel Case" })
	@IsNotEmpty()
	first_name: string;

	@Field()
	@Matches(/^\p{Lu}\p{Ll}*\b/gu, { message: "Must be Camel Case" })
	@IsNotEmpty()
	last_name: string;

	@Field()
	@IsEmail({}, { message: "Invalid email format" })
	@IsNotEmpty()
	email: string;

	@Field()
	@Length(8, 255, { message: "Password must be at least 8 characters long" })
	@IsNotEmpty()
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
		message:
			"Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number",
	})
	password: string;

	@Field()
	@IsBoolean()
	@IsEnum(EnumAdminRole)
	role: EnumAdminRole;
}
