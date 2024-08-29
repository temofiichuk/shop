import { auth } from "@/auth";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
	const session: Session | null = await req.auth;
	if (!session) return NextResponse.json({ error: "Unauthorized", status: 401 });

	return NextResponse.json({
		status: 200,
		accessToken: session.accessToken,
		refreshToken: session.refreshToken,
		role: session.user.role,
	});
});
