import { ReactNode } from "react";

interface EachProps<T> {
	children: (item: T, index: number) => ReactNode;
	of: T[];
}

const Each = <T, >({ of, children: render }: EachProps<T>): ReactNode[] =>
	of.map((item, index) => render(item, index));

export default Each;
