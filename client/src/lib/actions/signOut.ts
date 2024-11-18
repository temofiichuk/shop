"use server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { AuthError } from "@auth/core/errors";
import { signOut } from "@/auth";

const signOutAction: (redirectTo?: string) => Promise<{
	error?: string,
	success?: boolean
}> = async (redirectTo?: string) => {
	try {
		await signOut({ redirectTo });
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
					state.error = cause?.err?.toString() || "Callback Route Error";
					break;
				default:
					state.error = "Something went wrong.";
					break;
			}
			return state;
		}

		throw error;
	}
};
export default signOutAction;