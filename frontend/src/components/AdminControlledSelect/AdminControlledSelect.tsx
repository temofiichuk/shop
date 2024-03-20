import styles from "./AdminControlledSelect.module.scss";
import { Controller, FieldName, FieldValues, useFormContext, useWatch } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import InputError from "@/components/InputError/InputError";
import { useEffect, useState } from "react";

interface IAdminControlledSelect {
	label?: string;
	name: FieldName<FieldValues>;
	options: { value: string; label: string }[] | undefined;
	onCreateOption: (value: string) => void;
	isLoading: boolean;
}

interface OptionType {
	label: string;
	value: string;
}

const AdminControlledSelect = ({
	options,
	isLoading,
	onCreateOption,
	name,
	label,
}: IAdminControlledSelect) => {
	const [isFocus, setIsFocus] = useState(false);
	const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

	const {
		control,
		formState: { errors },
	} = useFormContext();

	const value = useWatch({ name });

	useEffect(() => {
		if (value === 0) {
			setSelectedOption(null);
			return;
		}

		const option = options?.find((option: OptionType) => option.value === value.toString());
		setSelectedOption(option ?? null);
	}, [value]);

	return (
		<div>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<>
						<CreatableSelect
							id={`select.${name}`}
							onFocus={() => setIsFocus(true)}
							unstyled
							classNames={{
								container: ({ isFocused, hasValue }) =>
									`${styles.container} ${isFocused && styles.containerFocus} 
									${hasValue && !isFocused && styles.containerHasValue}`,
								control: () => styles.control,
								menuList: () => styles.menuList,
								indicatorsContainer: () => styles.indicatorsContainer,
								menu: () => styles.menu,
								option: ({ isSelected }) =>
									`${styles.option} ${isSelected && styles.selectedOption}`,
								valueContainer: () => styles.valueContainer,
							}}
							options={options}
							isLoading={isLoading}
							value={selectedOption}
							onChange={(selectedOption) => {
								setSelectedOption(selectedOption);
								if (field.onChange) {
									field.onChange(selectedOption?.value ?? 0);
								}
							}}
							onBlur={() => {
								field.onBlur();
								setIsFocus(false);
							}}
							menuPosition="fixed"
							isClearable
							placeholder=""
							getOptionLabel={(option) => `${option.label}`}
							onCreateOption={(inputValue) => onCreateOption(inputValue)}
						/>
						<label
							className={styles.label}
							data-value={field.value}
							data-focus={isFocus}
							htmlFor={`select.${name}`}>
							<span>{label}</span>
						</label>
					</>
				)}
			/>
			<InputError errors={errors} name={name} />
		</div>
	);
};

AdminControlledSelect.displayName = "AdminControlledSelect";
export default AdminControlledSelect;
