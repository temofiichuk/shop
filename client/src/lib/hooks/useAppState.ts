import { remove, selectState, set } from "@/store/features/state.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useLayoutEffect, useMemo } from "react";
import { isEqual } from "apollo-utilities";


const useAppState = <T>(keyState: string, initialState?: T): [T, (val: {
	value: T
}) => void] => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectState(keyState)) as T;
	const memoState = useMemo(() => state, [state]);

	const setState = useCallback(({ value }: { value: T }) => {
		if (value === null) {
			dispatch(remove(keyState));
			return;
		}

		dispatch(set({ key: keyState, value }));
	}, [dispatch]);

	useLayoutEffect(() => {

		if (!initialState || isEqual(state, initialState)) return;
		dispatch(set({ key: keyState, value: initialState }));
	}, [keyState, initialState]);

	return [memoState, setState];
};

export default useAppState;
