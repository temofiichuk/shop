"use server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { AuthError } from "@auth/core/errors";
import { signOut } from "@/auth";

export default async () => {
	try {
		await signOut();
		return { success: true };
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		if (error instanceof Error) {
			const { type, cause } = error as AuthError;
			const state = { error: "" };
			switch (type) {
				case "CredentialsSignin":
					state.error = "Invalid credentials.";
					break;
				case "CallbackRouteError":
					state.error = cause?.err?.toString();
					break;
				default:
					state.error = "Something went wrong.";
					break;
			}
			return state;
		}

		throw error;
	}
}