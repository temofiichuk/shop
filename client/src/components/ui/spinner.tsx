import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLOrSVGElement> {
	widths?: number;
}

export const LoadingSpinner = ({ className, widths, width, height, ...props }: Props) => {
	return <svg
		xmlns="http://www.w3.org/2000/svg"
		width={widths ?? width ?? "24"}
		height={widths ?? height ?? "24"}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
		className={cn("animate-spin", className)}
	>
		<path d="M21 12a9 9 0 1 1-6.219-8.56" />
	</svg>;
};