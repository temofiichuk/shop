import { from, HttpLink } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { setContext } from "@apollo/client/link/context";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { onError as ErrorLink } from "@apollo/client/link/error";
import { toast } from "sonner";


const httpLink = new HttpLink({
	uri: process.env.NEXT_SERVER_URL,
});

const authLink = setContext(async (operation, { prevHeaders }) => {
	const isServer = typeof window === "undefined";
	let session: Session | null = null;

	if (isServer) {
		session = await auth();
	} else {
		const res = await fetch(`/api/auth/session`);
		session = await res.json();
	}
	return {
		headers: {
			...prevHeaders,
			authorization: session ? `Bearer ${session.accessToken}` : "",
		},
	};
});

const errorLink = ErrorLink(({ graphQLErrors }) => {
	graphQLErrors && console.error(graphQLErrors);
	if (!graphQLErrors) return;
	const isServer = typeof window === "undefined";
	isServer
		? console.error(graphQLErrors)
		: toast.error("Something went wrong , please reload the page and try again", {
			duration: 6000,
			description: graphQLErrors?.[0] ? `Cause: ${graphQLErrors?.[0]?.message}` : undefined,
		});
	return;
});


export default from([removeTypenameFromVariables(), authLink, errorLink, httpLink]);
