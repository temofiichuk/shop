import type { Metadata } from "next";
import "@/assets/scss/styles.scss";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import { Noto_Sans } from "next/font/google";
import NavMenu from "@/components/NavMenu/NavMenu";

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
			<Header />
			<NavMenu />
			<section>{children}</section>
		</main>
	);
};

export default RootLayout;
