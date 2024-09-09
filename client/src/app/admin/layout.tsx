import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<main
			aria-label="admin part"
			className={fontSans.variable}>

			{children}
			<Toaster />
		</main>
	);
};

export default Layout;
