import type { Metadata } from "next";
import { Catamaran } from "next/font/google";
import "@/assets/scss/styles.scss";
import { ReactNode } from "react";

const catamaran = Catamaran({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop with admin dashboard",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={catamaran.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
