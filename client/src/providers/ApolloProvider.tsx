"use client";
import { PropsWithChildren, useLayoutEffect, useMemo, useState } from "react";
import { ApolloClient, ApolloProvider as AppApolloProvider, InMemoryCache } from "@apollo/client";
import httpLink from "@/lib/apollo/apollo.auth-http-link";

const cache = new InMemoryCache({ addTypename: false });
export const ApolloProvider = ({ children }: PropsWithChildren) => {
	const [client, setClient] = useState<any>();

	const apollo = useMemo(() => {

		return new ApolloClient({
			link: httpLink,
			cache: cache,
			defaultOptions: { query: { fetchPolicy: "cache-first" } },
		});
	}, [cache, httpLink]);

	useLayoutEffect(() => {
		async function initCache() {
			// await persistCache({
			// 	cache,
			// 	storage: new LocalStorageWrapper(window.localStorage),
			// });
			setClient(apollo);
		}

		initCache();
	}, [apollo]);

	if (!client) return null;

	return <AppApolloProvider client={client}>{children}</AppApolloProvider>;
};

export default ApolloProvider;
