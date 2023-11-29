import type { Metadata } from "next";
import { Catamaran } from "next/font/google";
import "@/assets/scss/styles.scss";
import { ReactNode } from "react";
import ApolloProvider from "@/lib/apollo/apollo.provider";

const catamaran = Catamaran({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop with admin dashboard",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={catamaran.className} suppressHydrationWarning={true}>
        <ApolloProvider>
          {/*<ReduxProvider store={store}>/*/}
          {children}
          {/*</ReduxProvider>/*/}
        </ApolloProvider>
      </body>
    </html>
  );
};

export default RootLayout;
