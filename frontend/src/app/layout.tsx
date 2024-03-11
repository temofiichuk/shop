import type { Metadata } from "next";
import "@/assets/scss/styles.scss";
import { ReactNode } from "react";
import ApolloProvider from "@/providers/ApolloProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import Loading from "@/components/Loading/Loading";
import Message from "@/components/Message/Message";

export const metadata: Metadata = {
	title: "Shop",
	description: "Shop with admin dashboard",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en">
			<body suppressHydrationWarning={true}>
				<ApolloProvider>
					<ReduxProvider>
						<div className="max-w-screen-2xl m-auto min-h-screen overflow-hidden p-6 pb-20 2xl:overflow-visible 2xl:px-0">
							<Message />
							<Loading />
							{children}
						</div>
					</ReduxProvider>
				</ApolloProvider>
			</body>
		</html>
	);
};

export default RootLayout;
