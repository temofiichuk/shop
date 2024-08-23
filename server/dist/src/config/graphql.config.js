"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlConfig = void 0;
const apollo_1 = require("@nestjs/apollo");
exports.graphqlConfig = {
    autoSchemaFile: "src/schema.gql",
    driver: apollo_1.ApolloDriver,
    context: ({ req }) => ({ headers: req.headers }),
    formatError: (error) => {
        if (!error?.message.includes("Validation error"))
            return error;
        const originalError = error.extensions.originalError;
        const response = JSON.parse(originalError?.message ?? error?.message);
        if (response) {
            error.message = response.message;
            error.extensions.validation_errors = response.validation_errors;
        }
        return error;
    },
};
//# sourceMappingURL=graphql.config.js.map