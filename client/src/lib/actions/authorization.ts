"use server";
import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { AuthError } from "@auth/core/errors";

const authorization = async (payload: FormData, id: string, redirectTo?: string) => {
	try {
		await signIn(id, {
			email: payload.get("email"),
			password: payload.get("password"),
			redirectTo,
		});
		return undefined;
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		if (error instanceof Error) {
			const { type, cause } = error as AuthError;
			switch (type) {
				case "CredentialsSignin":
					return "Invalid credentials.";
				case "CallbackRouteError":
					return cause?.err?.toString();
				default:
					return "Something went wrong.";
			}
		}

		throw error;
	}
};

export const authorizationUser = async (
	state: Awaited<string | undefined>,
	payload: FormData,
	redirectTo?: string,
) => {
	return authorization(payload, "user-credentials", redirectTo ?? "/profile");
};

export const authorizationAdmin = async (
	state: Awaited<string | undefined>,
	payload: FormData,
	redirectTo?: string,
) => {
	return authorization(payload, "admin-credentials", redirectTo ?? "/admin/dashboard");
};
