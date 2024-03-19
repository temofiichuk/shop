import styles from "./Spinner.module.scss";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";

interface ISpinner {
	width?: number;
}

const Spinner = ({ width }: ISpinner) => {
	return <ArrowPathRoundedSquareIcon width={width ?? 20} className="animate-spinner h-auto" />;
};

export default Spinner;
