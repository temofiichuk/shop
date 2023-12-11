import { FC, ComponentType } from "react";
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";

const authAdmin = <C extends object>(Component: ComponentType<C>) => {
  const authComponent: FC<C> = (props) => {
    const currentUser = useAppSelector((state) => state.auth.value?.user);
    if (!currentUser) redirect("/admin");
    return <Component {...props} />;
  };

  return authComponent;
};

export default authAdmin;
