import { useEffect, useRef } from "react";

/** The useOutsideEvent hook is designed for detecting and responding to specific events that occur outside
 * a specified element. It takes two parameters: an event type (like "click") and a callback function to
 * execute when that event happens outside the targeted element. The hook uses a ref to keep a reference
 * to the element
 */
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
