"use client";
import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [isShow, setIsShow] = useState(false);
		return (
			<div className="flex justify-between items-center gap-2.5">
				<input
					type={isShow ? "text" : "password"}
					className={cn(
						"flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
						className,
					)}
					ref={ref}
					{...props}
				/>
				<Button type="button" size="sm" onClick={() => setIsShow(prev => !prev)}>
					{isShow ? <Eye /> : <EyeOff />}
				</Button>
			</div>
		);
	},
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
