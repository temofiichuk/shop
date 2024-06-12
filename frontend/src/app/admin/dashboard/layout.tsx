"use client";
import { ReactNode } from "react";
import AdminHeader from "@/components/AdminHeader/AdminHeader";
import withAuth from "@/utils/withAuth";
import { EnumUserRole } from "@/types/auth.types";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<AdminHeader />
			<div>{children}</div>
		</>
	);
};

export default withAuth(EnumUserRole.ADMIN, Layout);
