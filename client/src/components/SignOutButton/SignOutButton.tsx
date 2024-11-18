"use client";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import signOut from "@/lib/actions/signOut";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

const SignOutButton = () => {
	const [state, dispatch] = useFormState(signOut, undefined);
	const router = useRouter();

	useEffect(() => {
		if (!state?.error) return;
		toast.error(state.error);
	}, [state]);

	return (
		<form
			className="w-full h-full"
			action={async () => {
				await dispatch();
				router.refresh();
			}}>

			<SubmitButton className="w-full h-full align-middle text-left" children="Logout" />
		</form>
	);
};

SignOutButton.displayName = "SignOutButton";
export default SignOutButton;