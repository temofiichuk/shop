import { LoadingSpinner } from "@/components/ui/spinner";
import { useFormStatus } from "react-dom";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";


const SubmitButton = ({ children, onClick, disabled, ...props }: HTMLAttributes<HTMLButtonElement> & {
	disabled?: boolean
}) => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			onClick={(e) => {
				e.stopPropagation();
				onClick && onClick(e);
			}}
			disabled={pending || disabled}
			className={cn(props.className, "disabled:opacity-10 disabled:pointer-events-none")}
			{...props}
		>
			{pending ? <LoadingSpinner /> : children}
		</button>
	);
};

SubmitButton.displayName = "SubmitButton";
export default SubmitButton;