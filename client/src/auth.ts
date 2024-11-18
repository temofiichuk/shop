import Credentials from "next-auth/providers/credentials";
import NextAuth, { NextAuthConfig, Session, type User } from "next-auth";
import { AuthResponse, AuthUser, EnumUserRole } from "@/lib/graphql/generated/graphql";
import { apolloClient } from "@/lib/apollo/apollo.client";
import { AUTH_ADMIN_LOGIN, AUTH_ADMIN_TOKENS, AUTH_USER_LOGIN, AUTH_USER_TOKENS } from "@/lib/graphql/queries/auth";
import { decodeJwt } from "jose";

// @ts-ignore
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
	export interface Session {
		user: {
			id: number,
			email: string
			first_name: string,
			last_name: string,
			role: EnumUserRole;
		},
		accessToken: string;
		refreshToken: string;
		expires?: string
	}

	export interface User {
		user: AuthUser;
		accessToken: string;
		refreshToken: string;
	}
}

declare module "next-auth/jwt" {
	export interface JWT extends User {
	}
}

async function refreshAccessToken(refreshToken: string, role: EnumUserRole) {
	try {
		if (!refreshToken) {
			return null;
		}
		const isUser = role === EnumUserRole.User;
		const { data } = await apolloClient().query({
			query: isUser ? AUTH_USER_TOKENS : AUTH_ADMIN_TOKENS,
			variables: {
				refresh_token: refreshToken,
			},
			errorPolicy: "none",
		});

		const authData = isUser ? data.authUserNewTokens : data.authAdminNewTokens;

		if (authData) {
			return authData;
		}

		return null;
	} catch (error) {
		return null;
	}
}

const userCredentialsProvider = Credentials({
	id: "user-credentials",
	name: "User Credentials",
	credentials: {
		email: { type: "email", label: "Email", required: true },
		password: { type: "password", label: "Password", required: true },
	},
	async authorize(credentials) {
		if (!credentials.password || !credentials.email) {
			throw new Error("Invalid Credentials");
		}
		try {
			const { data } = await apolloClient().query<{ authUserLogin: AuthResponse }>({
				query: AUTH_USER_LOGIN,
				variables: {
					loginInput: {
						email: credentials.email,
						password: credentials.password,
					},
				},
			});

			if (!data || !data.authUserLogin) {
				throw new Error("Authentication failed: No user data returned.");
			}
			return { ...data.authUserLogin } as User;
		} catch (error) {
			throw new Error("Invalid Credentials", { cause: error });
		}
	},
});

const adminCredentialsProvider = Credentials({
	id: "admin-credentials",
	name: "Admin Credentials",
	credentials: {
		email: { type: "email", label: "Email", required: true },
		password: { type: "password", label: "Password", required: true },
	},
	async authorize(credentials) {
		if (!credentials.password && !credentials.email) {
			throw new Error("Invalid Credentials");
		}
		try {
			const { data } = await apolloClient().query<{ authAdminLogin: AuthResponse }>({
				query: AUTH_ADMIN_LOGIN,
				variables: {
					loginInput: {
						email: credentials.email,
						password: credentials.password,
					},
				},
			});
			if (!data || !data.authAdminLogin) {
				throw new Error("Authentication failed: No user data returned.");
			}
			return { ...data.authAdminLogin } as User;

		} catch (error) {
			throw new Error("Invalid Credentials", { cause: error });
		}
	},
});

const providers = [userCredentialsProvider, adminCredentialsProvider];

export const config = {
	secret: process.env.NEXTAUTH_SECRET || "secret",
	providers,
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (token && trigger !== "update") {
				const accessToken = token?.accessToken;
				if (accessToken) {
					const { exp } = decodeJwt(accessToken as string);
					if (exp && exp <= Math.ceil(Date.now() / 1000)) {
						const authData = await refreshAccessToken(token.refreshToken, token.user.role);
						return authData ? { ...token, ...authData } : null;
					}
				}
			}

			if (trigger === "update") {
				return { ...token, ...session };
			}

			return user ? { ...token, ...user } : token;
		},
		async session({ session, token }: { session: Session, token: JWT }) {
			session.user = {
				...token.user,
				role: token.user.role ?? EnumUserRole.User,
			};
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			return session;
		},
		// async redirect({ url, baseUrl }) {
		// 	if (url.endsWith("/login")) {
		// 		return new URL("/profile", baseUrl);
		// 	}
		// 	if (url.startsWith(new URL("/profile", baseUrl))) {
		// 		return new URL("/login", baseUrl);
		// 	}
		// 	if (url.endsWith("/admin")) {
		// 		return new URL("/admin/dashboard", baseUrl);
		// 	}
		// 	if (url.startsWith(new URL("/admin/dashboard", baseUrl))) {
		// 		return new URL("/admin", baseUrl);
		// 	}
		//
		// 	return url.startsWith(baseUrl) ? url : baseUrl;
		// },
	},


	trustHost: process.env.NEXTAUTH_URL,
} as NextAuthConfig;


export const { handlers, signIn, signOut, auth, unstable_update: update } = NextAuth(config);
