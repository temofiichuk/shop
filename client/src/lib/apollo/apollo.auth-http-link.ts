import { from, HttpLink } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { setContext } from "@apollo/client/link/context";
import { auth } from "@/auth";
import { Session } from "next-auth";


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


export default from([removeTypenameFromVariables(), authLink, httpLink]);
