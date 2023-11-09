import { ValidationError, ValidationPipe } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = {};
        errors.forEach((error) => {
          formattedErrors[error.property] = Object.values(error.constraints)[0];
        });

        return new UserInputError("Validation Error", {
          validation_errors: formattedErrors,
        });
      },
    });
  }
}
