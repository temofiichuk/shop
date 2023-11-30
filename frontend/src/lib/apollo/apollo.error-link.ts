import { onError } from "@apollo/client/link/error";
import AuthService from "@/services/auth/auth.service";
import { DefaultContext, FetchResult, fromPromise } from "@apollo/client";
import { getAccessToken } from "@/services/auth/auth.helper";

const errorLink = onError(({ graphQLErrors, forward, operation }) => {
  const message = graphQLErrors?.[0].message;
  if (message === "Unauthorized" || message === "Jwt expired") {
    return fromPromise(
      AuthService.updateTokens().then(() => {
        operation.setContext((ctx: DefaultContext) => {
          return (ctx.headers.authorization = `Bearer ${getAccessToken()}`);
        });
        return forward(operation) as FetchResult;
      })
    );
  }
});

export default errorLink;
