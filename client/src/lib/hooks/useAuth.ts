"use client";

import { useFormState } from "react-dom";
import { authorizationAdmin, authorizationUser } from "@/lib/actions/authorization";
import { toast } from "sonner";
import { EnumUserRole } from "@/lib/graphql/generated/graphql";
import { useEffect } from "react";

const useAuth = (role: EnumUserRole) => {
	const [error, dispatch, pending] = useFormState(
		role === EnumUserRole.User
			? authorizationUser
			: authorizationAdmin,
		undefined,
	);

	useEffect(() => {
		if (error) {
			toast("Something went wrong, please try again", {
				description: error,
			});
		}
	}, [error]);

	return { dispatch, pending, error };
};

export default useAuth;
