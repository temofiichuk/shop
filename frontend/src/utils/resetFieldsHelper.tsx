import { FieldName, FieldValues, UseFormResetField } from "react-hook-form";

const resetFieldsHelper = (
	fields: FieldName<FieldValues>[],
	resetField: UseFormResetField<any>
) => {
	for (let i = 0; i < fields.length; i++) {
		resetField(fields[i]);
	}
};

export default resetFieldsHelper;
