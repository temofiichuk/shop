import { PayloadState, remove, selectState, set } from "@/store/features/state.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLayoutEffect } from "react";


const useAppState = <T>(keyState?: string, initialState?: T): [T, (val: PayloadState & { value: T }) => void] => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectState(keyState));

	const setState = ({ value, key = keyState }: PayloadState & { value: T }) => {
		if (!key) {
			console.error("There must be a kay");
			return;
		}
		if (value === null) {
			dispatch(remove(key));
			return;
		}

		dispatch(set({ key, value }));
	};

	useLayoutEffect(() => {
		if (!initialState && !keyState) return;
		dispatch(set({ key: keyState, value: initialState }));
	}, [keyState, initialState]);

	return [state, setState];
};

export default useAppState;
