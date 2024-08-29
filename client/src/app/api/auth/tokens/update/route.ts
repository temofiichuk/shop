import { AUTH_ADMIN_TOKENS, AUTH_USER_TOKENS } from "@/lib/graphql/queries/auth";
import { auth, signOut, update } from "@/auth";
import { Session } from "next-auth";
import { EnumUserRole } from "@/lib/graphql/generated/graphql";
import { NextResponse } from "next/server";
import { apolloClient } from "@/lib/apollo/apollo.client";

export const GET = async () => {
	const session: Session | null = await auth();
	if (!session) {
		return NextResponse.json({ error: "Unauthorised", status: 401 });
	}
	const isUser = session?.user.role === EnumUserRole.User;
	try {
		const { data } = await apolloClient().query({
			query: isUser ? AUTH_USER_TOKENS : AUTH_ADMIN_TOKENS,
			variables: {
				refresh_token: session?.refreshToken,
			},
		});

		const authData = isUser ? data.authUserNewTokens : data.authAdminNewTokens;
		if (!authData) {
			await signOut({ redirectTo: isUser ? "/login" : "/admin" });
			return NextResponse.json({ error: "No auth data", status: 401 });
		}

		const newSession: Session | null = await update(authData);
		return NextResponse.json({ accessToken: newSession?.accessToken, status: 200 });
	} catch (e) {
		await signOut({ redirectTo: isUser ? "/login" : "/admin" });
		return NextResponse.json({ error: e, status: 401 });
	}

};

export const POST = async (req) => {
	const authData = req.json();

	if (!authData) {
		await signOut();
		return NextResponse.json({ error: "No auth data", status: 401 });
	}

	const newSession: Session | null = await update(authData);

	console.log(newSession, "newSession");

	return NextResponse.json({ accessToken: newSession?.accessToken, status: 200 });


};