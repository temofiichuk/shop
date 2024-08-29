import { from, HttpLink } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { Session } from "next-auth";
import { setContext } from "@apollo/client/link/context";
import { auth } from "@/auth";
import errorLink from "@/lib/apollo/apollo.error-link.server";

const httpLink = new HttpLink({
	uri: process.env.NEXT_SERVER_URL,
});

const authLink = setContext(async (operation, { headers }) => {
	const session: Session | null = await auth();
	return {
		headers: {
			...headers,
			authorization: session ? `Bearer ${session.accessToken}` : "",
		},
	};
});


export default from([removeTypenameFromVariables(), authLink, errorLink, httpLink]);
