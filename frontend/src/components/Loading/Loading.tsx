"use client";
import styles from "./Loading.module.scss";
import { useAppSelector } from "@/store/hooks";
import Spinner from "@/components/Spinner/Spinner";

const Loading = () => {
  const isLoading = useAppSelector((state) => state.isLoading.value);
  return (
    isLoading && (
      <div className={styles.loading}>
        <div className="w-[20%]">
          <Spinner />
        </div>
      </div>
    )
  );
};

export default Loading;
