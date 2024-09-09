"use client";

import { useFormState } from "react-dom";
import { authenticateAdmin as Admin, authenticateUser as User } from "@/lib/actions/authorization";
import { toast } from "sonner";
import { EnumUserRole } from "@/lib/graphql/generated/graphql";

const useAuth = (role: EnumUserRole) => {
	const [error, dispatch] = useFormState(role === EnumUserRole.User ? User : Admin, "");
	const { pending } = false;

	if (error) {
		// console.log(error);
		toast("Something went wrong, please try again", {
			description: error,
		});
	}

	return { dispatch, pending, error };
};

export default useAuth;
