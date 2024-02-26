import { useEffect, useRef } from "react";

const useOutsideEvent = <N extends Node, F extends Function>(event: keyof HTMLElementEventMap, callback: F) => {
	const ref = useRef<N>(null);

	useEffect(() => {
		const handler = (e: Event) => {
			if (!ref.current?.contains(e.target as N)) callback();
		};
		document.addEventListener(event, handler);
		return () => document.removeEventListener(event, handler);
	}, [ref]);

	return ref;
};

export default useOutsideEvent;
