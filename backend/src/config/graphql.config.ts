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
  formatError: (error: ErrorType): GraphQLFormattedError => {
    const originalError = error.extensions?.originalError as OriginalErrorType;

    return {
      message: originalError?.message ?? error.message,
      path: error.path,
      extensions: {
        code: originalError?.statusCode ?? error.extensions.statusCode,
        error: originalError?.code ?? error.extensions.code,
        validation_errors: error.extensions.validation_errors,
      },
    };
  },
};
