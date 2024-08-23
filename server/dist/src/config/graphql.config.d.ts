import { ApolloDriver } from "@nestjs/apollo";
import { GraphQLFormattedError } from "graphql";
import { GraphQLError } from "graphql/error/GraphQLError";
export declare const graphqlConfig: {
    autoSchemaFile: string;
    driver: typeof ApolloDriver;
    context: ({ req }: {
        req: any;
    }) => {
        headers: any;
    };
    formatError: (error: GraphQLError) => GraphQLFormattedError;
};
