import { PropsWithChildren } from "react";
import DashboardLayout from "@/containers/Dashboard/DashboardLayout";

const Layout = async ({ children }: PropsWithChildren) => <DashboardLayout>{children}</DashboardLayout>;

export default Layout;