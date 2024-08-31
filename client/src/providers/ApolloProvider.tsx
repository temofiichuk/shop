"use client";
import { PropsWithChildren, useMemo } from "react";
import { ApolloClient, ApolloProvider as AppApolloProvider, InMemoryCache } from "@apollo/client";
import httpLink from "@/lib/apollo/apollo.auth-http-link";


export const ApolloProvider = ({ children }: PropsWithChildren) => {
	const client = useMemo(() => new ApolloClient({
		link: httpLink,
		cache: new InMemoryCache(),
	}), []);

	return <AppApolloProvider client={client}>{children}</AppApolloProvider>;
};

export default ApolloProvider;
