import { ApolloDriver } from "@nestjs/apollo";
import { GraphQLFormattedError } from "graphql";
import { GraphQLError } from "graphql/error/GraphQLError";

type OriginalErrorType = {
  message: string;
  statusCode: number;
  code: string;
};

type ErrorType = GraphQLError & {
  message: string;
  code: string;
};

export const graphqlConfig = {
  autoSchemaFile: "src/schema.gql",
  driver: ApolloDriver,
  context: ({ req }) => ({ headers: req.headers }),
  formatError: (error: GraphQLError): GraphQLFormattedError => {
    if (!error?.message.includes("Validation error")) return error;

    const originalError = error.extensions.originalError as OriginalErrorType;
    const response = JSON.parse(originalError?.message ?? error?.message);

    if (response) {
      error.message = response.message;
      error.extensions.validation_errors = response.validation_errors;
    }

    return error;
  },
};
