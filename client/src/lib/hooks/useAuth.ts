"use client";

import { useFormState } from "react-dom";
import { authenticateAdmin as Admin, authenticateUser as User } from "@/lib/actions/authorization";
import { toast } from "sonner";
import { EnumUserRole } from "@/lib/graphql/generated/graphql";
import { useEffect } from "react";

const useAuth = (role: EnumUserRole) => {
	const [error, dispatch, pending] = useFormState(role === EnumUserRole.User ? User : Admin, "");

	useEffect(() => {
		if (error) {
			// console.log(error);
			toast("Something went wrong, please try again", {
				description: error,
			});
		}
	}, [error]);

	return { dispatch, pending, error };
};

export default useAuth;
