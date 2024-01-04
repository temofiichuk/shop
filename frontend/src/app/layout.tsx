import type { Metadata } from "next";
import "@/assets/scss/styles.scss";
import { ReactNode } from "react";
import ApolloProvider from "@/providers/ApolloProvider";
import ReduxProvider from "@/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop with admin dashboard",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ApolloProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </ApolloProvider>
      </body>
    </html>
  );
};

export default RootLayout;
