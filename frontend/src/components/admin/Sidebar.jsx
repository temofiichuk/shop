"use client";
import styles from "./Sidebar.module.scss";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import {
  RiArrowLeftDoubleFill,
  RiDashboardLine,
  RiBarChart2Line,
  RiShoppingBagLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

const Sidebar = () => {
  const curentUser = useAppSelector((state) => state.auth.user);
  const mainLink = "/admin/dashboard";

  const links = [
    {
      name: "Dashboard",
      icon: <RiDashboardLine />,
      url: mainLink,
    },
    {
      name: "Statistics",
      icon: <RiBarChart2Line />,
      url: `${mainLink}/statistics`,
    },
    {
      name: "Products",
      icon: <RiShoppingBagLine />,
      url: `${mainLink}/products`,
    },
  ];

  return (
    <aside className={styles.aside}>
      <div className={styles.logo}>
        <button>
          <RiArrowLeftDoubleFill />
        </button>
      </div>
      <div className={styles.list}>
        {links.map(({ url, icon, name }) => (
          <Link key={url} href={url} className={styles.link}>
            {icon}
            <span>{name}</span>
          </Link>
        ))}
      </div>
      <div>
        <button>
          <RiLogoutBoxRLine />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
