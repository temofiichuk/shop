import { LoadingSpinner } from "@/components/ui/spinner";
import { useFormStatus } from "react-dom";
import { HTMLAttributes } from "react";


const SubmitButton = ({ children, onClick, ...props }: HTMLAttributes<HTMLButtonElement>) => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			onClick={(e) => {
				e.stopPropagation();
				onClick && onClick(e);
			}}
			{...props}
		>
			{pending ? <LoadingSpinner /> : children}
		</button>
	);
};

SubmitButton.displayName = "SubmitButton";
export default SubmitButton;