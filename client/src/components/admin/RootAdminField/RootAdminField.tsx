import { PropsWithChildren } from "react";
import { auth } from "@/auth";
import { EnumUserRole } from "@/lib/graphql/generated/graphql";

const RootAdminField = async ({ children }: PropsWithChildren) => {
	const session = await auth();
	const isRootAdmin = session?.user.role === EnumUserRole.Rootadmin;
	if (!isRootAdmin) return null;
	return (<>{children}</>);
};

RootAdminField.displayName = "RootAdminField";
export default RootAdminField;