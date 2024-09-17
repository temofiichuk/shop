import { remove, selectState, set } from "@/store/features/state.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLayoutEffect } from "react";
import { isEqual } from "apollo-utilities";


const useAppState = <T>(keyState: string, initialState?: T): [T, (val: {
	value: T
}) => void] => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectState(keyState)) as T;

	const setState = ({ value }: { value: T }) => {
		if (value === null) {
			dispatch(remove(keyState));
			return;
		}

		dispatch(set({ key: keyState, value }));
	};

	useLayoutEffect(() => {

		if (!initialState || isEqual(state, initialState)) return;
		dispatch(set({ key: keyState, value: initialState }));
	}, [keyState, initialState]);

	return [state, setState];
};

export default useAppState;
