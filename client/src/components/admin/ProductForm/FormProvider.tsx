import { createContext, PropsWithChildren, ReactElement, useContext, useMemo } from "react";

import {
	Control,
	DefaultValues,
	FieldErrors,
	FieldValues,
	UseFormGetValues,
	UseFormRegister,
	UseFormReset,
	UseFormSetError,
	UseFormSetValue,
	UseFormTrigger,
	UseFormWatch,
} from "react-hook-form";

interface FormProviderValue<TFieldValues extends FieldValues> {
	register: UseFormRegister<TFieldValues>;
	control: Control<TFieldValues>;
	errors: FieldErrors<TFieldValues>;
	getValues: UseFormGetValues<TFieldValues>;
	setValue: UseFormSetValue<TFieldValues>;
	defaultValues?: Readonly<DefaultValues<TFieldValues>>
	reset: UseFormReset<TFieldValues>,
	watch: UseFormWatch<TFieldValues>;
	setError: UseFormSetError<TFieldValues>;
	trigger: UseFormTrigger<TFieldValues>;
}

const FormProviderContext = createContext<FormProviderValue<any> | undefined>(
	undefined,
);

export function useFormContext<
	TFieldValues extends FieldValues,
>(): FormProviderValue<TFieldValues> {
	const value = useContext(FormProviderContext);

	if (!value) {
		throw new Error("useFormContext called outside of a FormProvider.");
	}

	return value;
}

type MyFormProviderProps<TFieldValues extends FieldValues> = PropsWithChildren<
	FormProviderValue<TFieldValues>
>;

function FormProvider<TFieldValues extends FieldValues>(
	{
		register,
		control,
		errors,
		getValues,
		setValue,
		children,
		defaultValues,
		reset,
		watch,
		setError,
		trigger,
	}: MyFormProviderProps<TFieldValues>): ReactElement {
	const value = useMemo<FormProviderValue<TFieldValues>>(
		() => {
			return {
				register, control, errors, getValues, setValue,
				defaultValues, reset, watch, setError, trigger,
			};
		},
		[register, control, errors, getValues, setValue,
			defaultValues, reset, watch, setError, trigger],
	);

	return (
		<FormProviderContext.Provider value={value}>{children}</FormProviderContext.Provider>
	);
}

export default FormProvider;