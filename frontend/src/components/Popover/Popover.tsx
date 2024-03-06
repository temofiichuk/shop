import styles from "./Popover.module.scss";
import {
	cloneElement,
	FC,
	HTMLAttributes,
	memo,
	PropsWithChildren,
	ReactElement,
	useMemo,
	useState,
} from "react";
import useOutsideEvent from "@/lib/hooks/useOutsideEvent";
import { isEqual } from "lodash";

interface IPopover {
	children: [ReactElement, ReactElement];
	contentProps?: HTMLAttributes<HTMLElement>;
	handlerProps?: HTMLAttributes<HTMLElement>;
}

/**
 * A Popover component that renders a handler and content.
 * Clicking on the handler toggles the visibility of the content.
 * This component expects exactly two children, where the first child serves as the handler
 * and the second child serves as the content.
 */
const Popover: FC<IPopover> = ({ children, handlerProps, contentProps }) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useOutsideEvent<HTMLDivElement, () => void>("click", () => setIsOpen(false));

	return (
		<div ref={ref}>
			<div
				{...handlerProps}
				className={`${styles.handler} ${handlerProps?.className}`}
				onClick={() => setIsOpen((prevState) => !prevState)}>
				{children[0]}
			</div>
			<div
				{...contentProps}
				className={`${styles.wrapper} ${contentProps?.className}`}
				aria-hidden={!isOpen}>
				<div className={styles.content}>{children[1]}</div>
			</div>
		</div>
	);
};

Popover.displayName = "Popover";

export default Popover;
