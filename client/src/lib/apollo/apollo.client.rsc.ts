import { from } from "@apollo/client";
import {
	NextSSRApolloClient,
	NextSSRInMemoryCache,
	SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import httpLink from "@/lib/apollo/apollo.http-link.server";

export const { getClient } = registerApolloClient(() => {
	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === "undefined"
				? from([
					new SSRMultipartLink({
						stripDefer: true,
					}),
					httpLink,
				])
				: httpLink,
	});
});
