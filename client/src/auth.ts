import Credentials from "next-auth/providers/credentials";
import NextAuth, { AuthError, User } from "next-auth";
import { AuthResponse, AuthUser, EnumUserRole, LoginInput } from "@/lib/graphql/generated/graphql";
import { apolloClient } from "@/lib/apollo/apollo.client";
import { AUTH_ADMIN_LOGIN, AUTH_USER_LOGIN } from "@/lib/graphql/queries/auth";

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
				throw new AuthError("Authentication failed: No user data returned.");
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

export const { handlers, signIn, signOut, auth, unstable_update: update } = NextAuth(config);
