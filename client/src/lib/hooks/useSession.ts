import { Session } from "next-auth";
import { useSession as useAuthSession } from "next-auth/react";

const useSession = () => {
	const { data: session, ...rest }: { session: Session | null } = useAuthSession();
	return { ...rest, session };
};

export default useSession;
