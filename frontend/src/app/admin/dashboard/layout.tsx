import { ReactNode } from "react";
import AdminHeader from "@/components/AdminHeader/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen bg-gray-200 p-4">
      <div className="flex bg-gray-100 min-w-full min-h-full rounded-3xl p-4 shadow-sm flex-col sm:flex-row ">
        <AdminSidebar />
        <div className="w-full">
          <AdminHeader />
          <div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
