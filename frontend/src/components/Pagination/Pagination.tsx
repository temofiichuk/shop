import { Button, IconButton } from "@material-tailwind/react";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import styles from "./Pagination.module.scss";
interface IPagination {
  count: number;
  take: number;
  handler: (page: number) => void;
}

const Pagination = ({ count, take, handler }: IPagination) => {
  const [active, setActive] = useState(1);
  const pages = Array.from(Array(Math.ceil(count / take)).keys());

  const showNumberOfPagination = 5;
  const middlePagination = Math.ceil(showNumberOfPagination / 2);

  const startFromEnd =
    active > pages.length - middlePagination
      ? pages.length - showNumberOfPagination
      : active - middlePagination;

  const start = active - middlePagination <= 0 ? 0 : startFromEnd;
  const pagesAround = [...pages].splice(start, showNumberOfPagination);

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

  useEffect(() => {
    handler(active);
  }, [active]);

  return (
    <div className={styles.pagination}>
      <Button
        variant="text"
        className={styles.button}
        onClick={prev}
        disabled={active === 1}>
        <RiArrowDropLeftLine strokeWidth={2} className="h-4 w-4" />
      </Button>
      <div className={styles.button}>
        {pagesAround.map((page) => {
          ++page;
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
