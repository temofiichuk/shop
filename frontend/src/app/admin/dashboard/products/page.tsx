"use client";

import withAuth from "@/utils/withAuth";
import { EnumUserRole } from "@/types/auth.types";
import AdminProducts from "@/components/AdminProducts/AdminProducts";

const Page = () => {
	return <AdminProducts />;
};

export default withAuth(EnumUserRole.ADMIN, Page);
