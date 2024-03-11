import { FC } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldName, FieldValues } from "react-hook-form";

interface IInputError {
	errors: FieldErrors;
	name: FieldName<FieldValues>;
}

const InputError: FC<IInputError> = (props) => {
	return (
		<ErrorMessage
			{...props}
			render={({ message }) => <p className="text-red-700 animate-shake">{message}</p>}
		/>
	);
};

InputError.displayName = "InputError";
export default InputError;
