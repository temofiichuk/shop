"use client";
import { FC, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import { EnumUserRole } from "@/types/auth.types";
import { useAppDispatch } from "@/store/hooks";
import { setTitle } from "@/store/features/admin.page-title.slice";
import AdminProducts from "@/components/AdminProducts/AdminProducts";

const Products: FC = () => {
  const title = "Products";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle({ value: title }));
  }, []);

  return (
    <div>
      <AdminProducts />
    </div>
  );
};

export default withAuth(EnumUserRole.ADMIN, Products);
