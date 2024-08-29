import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";

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
		</main>
	);
};

export default Layout;
