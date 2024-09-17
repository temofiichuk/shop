import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = new HttpLink({
	uri: process.env.NEXT_SERVER_URL,
});

export const apolloClient = () => new ApolloClient({
	cache: new InMemoryCache(),
	link: from([removeTypenameLink, httpLink]),
});

