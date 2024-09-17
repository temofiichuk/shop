import UserLoginForm from "@/components/UserLoginForm/UserLoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { EnumUserRole } from "@/lib/graphql/generated/graphql";


const UserLogin = async () => {
	const session: Session | null = await auth();

	if (session?.user && session.user.role === EnumUserRole.User) {
		redirect("/profile");
	}

	return (
		<UserLoginForm />
	);
};

UserLogin.displayName = "AdminLogin";
export default UserLogin;