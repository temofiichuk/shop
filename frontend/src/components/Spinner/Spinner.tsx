import styles from "./Spinner.module.scss";
import { RiLoader5Fill } from "react-icons/ri";

const Spinner = () => {
  return (
    <div className={`animate-spinner flex justify-center items-center w-full`}>
      <RiLoader5Fill className="w-full h-full" />
    </div>
  );
};

export default Spinner;
