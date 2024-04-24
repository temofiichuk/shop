import styles from "./Pagination.module.scss";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
interface IPagination {
	count: number;
	take: number;
	setActive: (page: number) => void;
	active: number;
	visibleButtons: number;
}

const Pagination = ({ count, take, active, setActive, visibleButtons }: IPagination) => {
	if (count < 1) return;
	const [inputValue, setInputValue] = useState<number | string>(active);

	const length = Math.ceil(count / take);
	const pages = Array.from(Array(length), (_, i) => i + 1);

	const middlePagination = Math.ceil(visibleButtons / 2);

	const startFromEnd =
		active > pages.length - middlePagination
			? pages.length - visibleButtons
			: active - middlePagination;

	const start = active - middlePagination <= 0 ? 0 : startFromEnd;
	const pagesAround = [...pages].splice(start, visibleButtons);

	const next = () => {
		if (active === pages.length) return;
		setActive(active + 1);
	};

	const prev = () => {
		if (active === 1) return;
		setActive(active - 1);
	};

	const set = (num: number) => {
		if (num < 0 || num > pages.length || num === active) return;
		setActive(num);
	};

	const debounceSetActive = debounce(set, 2000);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "");
		if (+value > pages.length) return;
		setInputValue(value);

		if (value !== "") {
			debounceSetActive(+value);
		}
	};

	useEffect(() => {
		setInputValue(active);
	}, [active]);

	return (
		<div className={styles.pagination}>
			<Button variant="text" className={styles.button} onClick={prev} disabled={active === 1}>
				<RiArrowDropLeftLine strokeWidth={2} className="h-4 w-4" />
			</Button>
			<div className={styles.buttons}>
				{pagesAround.map((page) => {
					return (
						<IconButton
							variant={active === page ? "filled" : "text"}
							color="gray"
							onClick={() => setActive(page)}
							className={styles.iconButton}
							key={page}>
							{page}
						</IconButton>
					);
				})}
			</div>
			<div className={styles.input}>
				<Input
					crossOrigin={undefined}
					value={inputValue}
					onChange={handleChange}
					label="Page"
					className="input"
				/>
			</div>
			<Button
				variant="text"
				className={styles.button}
				onClick={next}
				disabled={active === pages.length}>
				<RiArrowDropRightLine strokeWidth={2} className="h-4 w-4" />
			</Button>
		</div>
	);
};

export default Pagination;
