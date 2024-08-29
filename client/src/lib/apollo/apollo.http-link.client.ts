import { from, HttpLink } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { AuthError } from "next-auth";
import { setContext } from "@apollo/client/link/context";
import errorLink from "@/lib/apollo/apollo.error-link.client";


const httpLink = new HttpLink({
	uri: process.env.NEXT_SERVER_URL,
});

const authLink = setContext(async (operation, { headers }) => {
	const { accessToken } = await fetch("/api/auth/tokens")
		.then((res) => res.json())
		.catch(e => new AuthError(e));
	return {
		headers: {
			...headers,
			authorization: `Bearer ${accessToken}`,
		},
	};
});


export default from([removeTypenameFromVariables(), authLink, errorLink, httpLink]);
