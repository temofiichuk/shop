"use client";
import { FC } from "react";
import authAdmin from "@/utils/authAdmin";

const Dashboard: FC = () => {
  return <div>Dashboard</div>;
};

export default authAdmin(Dashboard);
