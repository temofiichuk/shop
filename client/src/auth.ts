import Credentials from "next-auth/providers/credentials";
import NextAuth, { AuthError, Session, User } from "next-auth";
import { AuthResponse, AuthUser, EnumUserRole, LoginInput } from "@/lib/graphql/generated/graphql";
import { apolloClient } from "@/lib/apollo/apollo.client";
import { AUTH_ADMIN_LOGIN, AUTH_ADMIN_TOKENS, AUTH_USER_LOGIN, AUTH_USER_TOKENS } from "@/lib/graphql/queries/auth";
import { decodeJwt } from "jose";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextAuthRequest } from "next-auth/lib";
import { AppRouteHandlerFn, AppRouteHandlerFnContext } from "next-auth/lib/types";

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
	async authorize(credentials: LoginInput) {
		if (!credentials.password || !credentials.email) {
			throw new AuthError("Invalid Credentials");
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
				return new AuthError("Authentication failed: No user data returned.");
			}
			return { ...data.authUserLogin } as User;
		} catch (error) {
			console.error("Error during authentication:", error);
			throw new AuthError("Authentication error: Unable to log in.");
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
	async authorize(credentials: LoginInput) {
		if (!credentials.password && !credentials.email) {
			throw new AuthError("Invalid Credentials");
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
				throw new AuthError("Authentication failed: No user data returned.");
			}
			return { ...data.authAdminLogin } as User;

		} catch (error) {
			throw new AuthError(error.type, { cause: error });
		}
	},
});

const providers = [userCredentialsProvider, adminCredentialsProvider];

const executedProviders = ["admin-credentials", "user-credentials"];

export const providerMap = providers
	.map((provider) => {
		const { id, name } = typeof provider === "function" ? provider() : provider;
		return { id, name };
	})
	.filter((provider) => !executedProviders.includes(provider.id));

export const config = {
	secret: process.env.NEXTAUTH_SECRET || "secret",
	providers,
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (token && trigger !== "update") {
				const accessToken = token?.accessToken;
				if (accessToken) {
					const { exp } = decodeJwt(accessToken);
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
		async session({ session, token }) {
			session.user = {
				...token.user,
				role: token.user.role ?? EnumUserRole.User,
			};
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			return session;
		},
		async redirect({ url, baseUrl }) {
			if (url.endsWith("/login")) {
				return new URL("/profile", baseUrl);
			}
			if (url.startsWith(new URL("/profile", baseUrl))) {
				return new URL("/login", baseUrl);
			}
			if (url.endsWith("/admin")) {
				return new URL("/admin/dashboard", baseUrl);
			}
			if (url.startsWith(new URL("/admin/dashboard", baseUrl))) {
				return new URL("/admin", baseUrl);
			}

			return url.startsWith(baseUrl) ? url : baseUrl;
		},
	},

	logger: process.env.NODE_ENV === "development" ? {
		error(code, ...message) {
			console.error(code, message);
		},
		warn(code, ...message) {
			console.warn(code, message);
		},
		debug(code, ...message) {
			console.debug(code, message);
		},
	} : undefined,
};


export const { handlers, signIn, signOut, auth: isAuth, unstable_update: update } = NextAuth(config);
export const auth: ((...args: [NextApiRequest, NextApiResponse]) => Promise<Session | null>) & ((...args: []) => Promise<Session | null>) & ((...args: [GetServerSidePropsContext]) => Promise<Session | null>) & ((...args: [(req: NextAuthRequest, ctx: AppRouteHandlerFnContext) => ReturnType<AppRouteHandlerFn>]) => AppRouteHandlerFn) = isAuth;