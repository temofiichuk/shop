"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface ProgressProps {
	value: number,
}

const AnimatedProgress = ({ value }: ProgressProps) => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const key = setTimeout(() => {
			setCounter(value);
		});

		return () => clearTimeout(key);
	}, []);

	return (
		<Progress value={counter > 100 ? 100 : counter} aria-label={`${value}% increase`} />
	);
};

export default AnimatedProgress;
