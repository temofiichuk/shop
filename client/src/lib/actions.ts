"use server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { signOut as authSignOut } from "@/auth";

export const signOut = async () => {
	try {
		await authSignOut();
	} catch (e) {
		// console.log(e);
		if (isRedirectError(e)) {
			throw e;
		}
	}
};


