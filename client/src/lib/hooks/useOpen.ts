import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	hide as hideElm,
	IsOpenState,
	selectIsOpen,
	set as setIsOpen,
	show as showElem,
	toggle as toggleElm,
} from "@/store/features/isOpen.slice";

function useOpen(elem?: keyof IsOpenState) {
	const dispatch = useAppDispatch();

	const isOpen = elem ? useAppSelector(selectIsOpen(elem)) : undefined;

	const set = (open: boolean, current: keyof IsOpenState = elem) => {
		dispatch(setIsOpen({ [current]: open }));
	};

	const toggle = (current: keyof IsOpenState = elem) => {
		dispatch(toggleElm(current));
	};

	const show = (current: keyof IsOpenState = elem) => {
		dispatch(showElem(current));
	};

	const hide = (current: keyof IsOpenState = elem) => {
		dispatch(hideElm(current));
	};


	return { isOpen, set, toggle, show, hide };
}

export default useOpen;
