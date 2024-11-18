import AdminLoginForm from "@/components/AdminLoginForm/AdminLoginForm";


const AdminLogin = async () => {
	return (
		<section className="w-full h-full grid place-items-center">
			<AdminLoginForm />
		</section>
	);
};

AdminLogin.displayName = "AdminLogin";
export default AdminLogin;