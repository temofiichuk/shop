"use client";
import { from } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  SSRMultipartLink,
  ApolloNextAppProvider,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { PropsWithChildren } from "react";
import httpLink from "@/lib/apollo/apollo.http-link";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

export const makeClient = () => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
          ])
        : httpLink,
  });
};

if (process.env.NODE_ENV === "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};

export default ApolloWrapper;
