import { onError } from "@apollo/client/link/error";
import { FetchResult, Observable } from "@apollo/client";
import { GraphQLError } from "graphql/error";
import { headers } from "next/headers";


const errorLink = onError(({ graphQLErrors, forward, operation }) => {
	const message = graphQLErrors?.[0].message;
	if (message === "Unauthorized" || message === "Jwt expired") {
		return new Observable<FetchResult<Record<string, any>>>(
			(observer) => {
				(async () => {
					try {
						console.log("errorLink");
						const authData = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/tokens/update`, {
							headers: {
								"Cookie": `${headers().get("cookie")}`,
							},
						}).then(data => data.json());

						if (authData.status !== 200) {
							throw new GraphQLError("Empty AccessToken");
						}

						operation.setContext((previousContext) => ({
							...previousContext,
							headers: {
								authorization: authData ? `Bearer ${authData.accessToken}` : "",
							},
						}));
						// Retry the failed request
						const subscriber = {
							next: observer.next.bind(observer),
							error: observer.error.bind(observer),
							complete: observer.complete.bind(observer),
						};

						forward(operation).subscribe(subscriber);
					} catch (err) {
						observer.error(err);
					}
				})();
			},
		);
	}
});

export default errorLink;