import {
  BadRequestException,
  HttpException,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";
import { ApolloError, UserInputError } from "apollo-server-express";
import { GraphQLException } from "@nestjs/graphql/dist/exceptions";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { ValidationErrorCode } from "@apollo/server/src/plugin/schemaReporting/generated/operations";

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

        return new BadRequestException(JSON.stringify(res));
      },
    });
  }
}
