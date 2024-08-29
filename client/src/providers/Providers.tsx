import { PropsWithChildren } from "react";
import ApolloProvider from "./ApolloProvider";
import ReduxProvider from "./ReduxProvider";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "./ThemeProvider";
import { auth } from "@/auth";
import { Session } from "next-auth";

const Providers = async ({ children }: PropsWithChildren) => {
	const session: Session | null = await auth();
	return (
		<SessionProvider session={session}>
			<ApolloProvider>
				<ReduxProvider>
					<ThemeProvider>
						{children}
					</ThemeProvider>
				</ReduxProvider>
			</ApolloProvider>
		</SessionProvider>
	);
};

export default Providers;
