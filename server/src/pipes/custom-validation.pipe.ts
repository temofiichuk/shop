import { ValidationError, ValidationPipe } from "@nestjs/common";
import { ApolloError } from "apollo-server-express";

export class CustomValidationPipe extends ValidationPipe {
	constructor() {
		super({
			transform: true,
			exceptionFactory: (errors: ValidationError[]) => {
				const formattedErrors = {};
				errors.forEach((error) => {
					formattedErrors[error.property] = Object.values(error.constraints)[0];
				});

				const res = {
					message: "Validation error",
					validation_errors: formattedErrors,
				};

				return new ApolloError(JSON.stringify(res));
			},
		});
	}
}
