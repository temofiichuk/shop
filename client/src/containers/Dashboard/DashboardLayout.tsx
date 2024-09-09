import { PropsWithChildren } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader/AdminHeader";
import { Toaster } from "sonner";


const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<div className="flex min-h-screen w-full flex-col">
				<AdminSidebar />
				<div className="flex flex-col sm:gap-4 sm:pb-4 sm:pt-2 sm:pl-14">
					<div className="sticky top-0 z-40">
						<AdminHeader />
					</div>
					{children}
				</div>
			</div>
			<Toaster />
		</>
	);
};

export default Layout;