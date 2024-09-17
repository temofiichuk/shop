import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const AdminLoginLayout = ({ children }: PropsWithChildren) => {
	return (
		<div
			aria-label="admin part"
			className={cn(fontSans.variable, "w-screen h-screen")}>

			{children}
			<Toaster />
		</div>
	);
};

export default AdminLoginLayout;
