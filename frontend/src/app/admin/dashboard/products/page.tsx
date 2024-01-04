"use client";
import { FC } from "react";
import withAuth from "@/utils/withAuth";
import { EnumUserRole } from "@/types/auth.types";

const Products: FC = () => {
  return <div>Products</div>;
};

export default withAuth(EnumUserRole.ADMIN, Products);
