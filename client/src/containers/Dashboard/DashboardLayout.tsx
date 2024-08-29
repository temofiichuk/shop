import { PropsWithChildren } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import AdminHeader from "@/components/AdminHeader/AdminHeader";
import { Toaster } from "sonner";

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<div className="flex min-h-screen w-full flex-col">
				<AdminSidebar />
				<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
					<AdminHeader />
					{children}
				</div>
			</div>
			<Toaster />
		</>
	);
};

export default Layout;