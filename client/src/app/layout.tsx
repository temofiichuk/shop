import type { Metadata } from "next";
import "@/assets/scss/styles.scss";
import { PropsWithChildren } from "react";
import Providers from "@/providers/Providers";

export const metadata: Metadata = {
	title: "Shop",
	description: "Shop with admin dashboard",
};

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<html suppressHydrationWarning>
		<body>
		<Providers>
			{children}
		</Providers>
		</body>
		</html>
	);
};

export default RootLayout;
