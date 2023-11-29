"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import httpLink from "@/lib/apollo/apollo.http-link";

import { PropsWithChildren } from "react";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
