import { ComponentType, FC, useLayoutEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";
import { EnumUserRole } from "@/types/auth.types";

const withAuth = <C extends object>(
  authFor: EnumUserRole,
  Component: ComponentType<C>
) => {
  const authComponent: FC<C> = (props) => {
    const currentUser = useAppSelector((state) => state.auth.user);

    useLayoutEffect(() => {
      if (currentUser?.role !== authFor)
        redirect(authFor === EnumUserRole.ADMIN ? "/admin" : "/login");
    }, []);

    return <Component {...props} />;
  };

  return authComponent;
};

export default withAuth;
