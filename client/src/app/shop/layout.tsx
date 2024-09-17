import type { Metadata } from "next";
import "@/assets/scss/styles.scss";
import { ReactNode } from "react";
import { Noto_Sans } from "next/font/google";

const NOTO_SANS = Noto_Sans({
	weight: ["300", "400", "800"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Shop",
	description: "Shop",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className={NOTO_SANS.className}>
			{children}
		</main>
	);
};

export default RootLayout;
