import { EnumUserRole } from "@/lib/graphql/generated/graphql";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = {
	user: { path: "/profile", redirectTo: "/login" },
	admin: { path: "/admin/dashboard", redirectTo: "/admin" },
};

export default async (req: NextRequest, res: NextResponse) => {

	const session = await auth();
	if (!session) {
		if (req.nextUrl.pathname.startsWith(privateRoutes.user.path)) {
			const newUrl = new URL(privateRoutes.user.redirectTo, req.nextUrl.origin);
			return Response.redirect(newUrl);
		}

		if (req.nextUrl.pathname.startsWith(privateRoutes.admin.path)) {
			const newUrl = new URL(privateRoutes.admin.redirectTo, req.nextUrl.origin);
			return NextResponse.redirect(newUrl);
		}
	} else {
		const { user: { role } } = session;

		if ((role === EnumUserRole.Admin || role === EnumUserRole.Rootadmin) && req.nextUrl.pathname.startsWith(privateRoutes.user.path)) {
			const newUrl = new URL(privateRoutes.user.redirectTo, req.nextUrl.origin);
			return Response.redirect(newUrl);
		}

		if (role === EnumUserRole.User && req.nextUrl.pathname.startsWith(privateRoutes.admin.path)) {
			const newUrl = new URL(privateRoutes.admin.redirectTo, req.nextUrl.origin);
			return Response.redirect(newUrl);
		}
	}
};

export const config = { matcher: ["/profile/:path*", "/admin/dashboard/:path*"] };