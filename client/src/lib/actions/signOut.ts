"use server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { signOut } from "@/auth";

export default async () => {
	try {
		await signOut();
	} catch (e) {
		if (isRedirectError(e)) {
			throw e;
		}
		throw e;
	}
};