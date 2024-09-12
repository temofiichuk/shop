"use server";
import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { AuthError } from "@auth/core/errors";

const authorization = async (payload, id) => {
	try {
		const data = await signIn(id, {
			email: payload.get("email"),
			password: payload.get("password"),
		});

		console.log("data");
		console.log(data);

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

export const authenticateUser = async (
	state: Awaited<string | undefined>,
	payload: FormData,
) => {
	return authorization(payload, "user-credentials");
};

export const authenticateAdmin = async (
	state: Awaited<string | undefined>,
	payload: FormData,
) => {
	return authorization(payload, "admin-credentials");
};
