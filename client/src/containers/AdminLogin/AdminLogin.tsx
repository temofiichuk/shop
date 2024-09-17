import AdminLoginForm from "@/components/AdminLoginForm/AdminLoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { EnumUserRole } from "@/lib/graphql/generated/graphql";
import { Session } from "next-auth";


const AdminLogin = async () => {
	const session: Session | null = await auth();
	if (session?.user && (session.user.role === EnumUserRole.Admin
		|| session.user.role === EnumUserRole.Rootadmin)) {
		redirect("/admin/dashboard");
	}

	return (
		<section className="w-full h-full grid place-items-center">
			<AdminLoginForm />
		</section>
	);
};

AdminLogin.displayName = "AdminLogin";
export default AdminLogin;