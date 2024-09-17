import { Session } from "next-auth";
import { SessionContextValue, useSession as useAuthSession } from "next-auth/react";

const useSession = (): { session: Session | null } & Omit<SessionContextValue, "data"> => {
	const { data: session, ...rest } = useAuthSession();
	return { ...rest, session };
};

export default useSession;
