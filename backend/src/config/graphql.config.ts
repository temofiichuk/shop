import { ApolloDriver } from "@nestjs/apollo";
import { GraphQLErrorExtensions, GraphQLFormattedError } from "graphql";
import { GraphQLError, GraphQLErrorOptions } from "graphql/error/GraphQLError";

type OriginalErrorType = {
  message: string;
  error: string;
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
    console.log(error);
    const originalError = error.extensions?.originalError as OriginalErrorType;

    if (!originalError) {
      return {
        message: error.message,
        path: error.path,
        extensions: {
          error: error.extensions?.code,
          status: error.extensions?.status,
        },
      };
    }

    return {
      message: originalError.message,
      path: error.path,
      extensions: {
        code: originalError.statusCode,
        status: error.extensions?.statusCode,
        error: originalError.error,
      },
    };
  },
};
