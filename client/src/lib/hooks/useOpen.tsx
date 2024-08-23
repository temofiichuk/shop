import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IsOpenType } from "@/store/features/is-open.slice";
import { setIsOpen } from "@/store/features/is-open.slice";

function useOpen(elem: keyof IsOpenType): [boolean, (open: boolean) => void] {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => state.isOpen[elem]);
  const setIsOpenElem = (open: boolean) => {
    dispatch(setIsOpen({ [elem]: open }));
  };

  return [isOpen, setIsOpenElem];
}

export default useOpen;
