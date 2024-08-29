import { onError } from "@apollo/client/link/error";
import { FetchResult, Observable } from "@apollo/client";
import { GraphQLError } from "graphql/error";
import changeContext from "@/lib/apollo/apollo.change-context";


const errorLink = onError(({ graphQLErrors, forward, operation }) => {
	const message = graphQLErrors?.[0].message;
	if (message === "Unauthorized" || message === "Jwt expired") {
		return new Observable<FetchResult<Record<string, any>>>(
			(observer) => {
				(async () => {
					try {
						const authData = await fetch("/api/auth/tokens/update").then(data => data.json());

						if (authData.status !== 200) {
							throw new GraphQLError("Empty AccessToken");
						}

						changeContext(forward, operation, observer, authData.accessToken);
					} catch (err) {
						console.error(err);
					}
				})();
			},
		);
	}
});

export default errorLink;