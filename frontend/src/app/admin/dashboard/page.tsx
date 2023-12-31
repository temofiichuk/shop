"use client";
import { FC } from "react";
import withAuth from "@/utils/withAuth";
import { EnumUserRole } from "@/types/auth.types";

const Dashboard: FC = () => {
  return <div>Dashboard</div>;
};

export default withAuth(EnumUserRole.ADMIN, Dashboard);
