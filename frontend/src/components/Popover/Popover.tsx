import styles from "./Popover.module.scss";
import { cloneElement, FC, HTMLAttributes, memo, PropsWithChildren, ReactElement, useMemo, useState } from "react";
import useOutsideEvent from "@/lib/hooks/useOutsideEvent";

interface IPopover {
	children: [ReactElement, ReactElement];
}
interface IChild extends HTMLAttributes<HTMLElement> {}
interface IChild extends PropsWithChildren {}

/**
 * A Popover component that renders a handler and content.
 * Clicking on the handler toggles the visibility of the content.
 * This component expects exactly two children, where the first child serves as the handler
 * and the second child serves as the content.
 */
const Popover: FC<IPopover> = memo(({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useOutsideEvent<HTMLDivElement, () => void>("click", () => setIsOpen(false));

	const { Handler, Content } = useMemo(() => {
		const Handler: FC<IChild> = (props) => {
			return (
				children[0] &&
				cloneElement(children[0] as ReactElement, {
					...props,
					className: ` ${styles.handler} ${children[0]?.props?.className ?? ""}`,
				})
			);
		};
		const Content: FC<IChild> = (props) =>
			children[1] && cloneElement(children[1] as ReactElement, { ...props, className: styles.content });

		return { Handler, Content };
	}, [children]);

	return (
		<div ref={ref}>
			<Handler onClick={() => setIsOpen((prevState) => !prevState)} />
			<div className={`${styles.wrapper} ${children[1]?.props?.className ?? ""}`} aria-hidden={!isOpen}>
				<div className={styles.content}>
					<Content />
				</div>
			</div>
		</div>
	);
});

Popover.displayName = "Popover";

export default Popover;
