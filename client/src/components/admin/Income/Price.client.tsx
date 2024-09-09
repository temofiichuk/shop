"use client";
import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { USD } from "@/lib/functions";

interface PriceProps {
	price: number;
}

const Price = ({ price }: PriceProps) => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const controls = animate(0, price, {
			duration: 1,
			onUpdate: (value) => setCounter(Math.floor(value)),
			ease: "easeOut",
		});

		return controls.stop;
	}, [price]);

	return <span>{USD.format(counter)}</span>;
};

export default Price;
