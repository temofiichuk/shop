"use client";
import { ComponentType, FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";
import { EnumUserRole } from "@/types/auth.types";
import { setIsLoading } from "@/store/features/is-loading.slice";

const withAuth = <C extends object>(authFor: EnumUserRole, Component: ComponentType<C>) => {
	const authComponent: FC<C> = (props) => {
		const [isAuth, setIsAuth] = useState(false);
		const currentUser = useAppSelector((state) => state.auth.user);
		const dispatch = useAppDispatch();

		useEffect(() => {
			dispatch(setIsLoading(true));
			if (currentUser?.role !== authFor) {
				redirect(authFor === EnumUserRole.ADMIN ? "/admin" : "/login");
			} else {
				setIsAuth(true);
			}
			dispatch(setIsLoading(false));
		}, []);

		if (isAuth) return <Component {...props} />;
	};

	return authComponent;
};

export default withAuth;
