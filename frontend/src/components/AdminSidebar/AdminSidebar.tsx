"use client";
import styles from "./AdminSidebar.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import {
  RiArrowLeftDoubleFill,
  RiDashboardLine,
  RiBarChart2Line,
  RiShoppingBagLine,
  RiLogoutBoxRLine,
  RiSlackLine,
} from "react-icons/ri";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { logout } from "@/store/features/auth.slice";

const AdminSidebar = () => {
  const curentUser = useAppSelector((state) => state.auth.user);
  const location = usePathname();

  const [isShort, setIsShort] = useState(false);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
  };

  const mainLink = "/admin/dashboard";
  const links = [
    {
      name: "Dashboard",
      icon: <RiDashboardLine className="icon" />,
      url: mainLink,
    },
    {
      name: "Statistics",
      icon: <RiBarChart2Line className="icon" />,
      url: `${mainLink}/statistics`,
    },
    {
      name: "Products",
      icon: <RiShoppingBagLine className="icon" />,
      url: `${mainLink}/products`,
    },
  ];

  return (
    <aside className={`${styles.aside} ${isShort && styles.asideShort}`}>
      <div>
        <div className={styles.logo}>
          <div>
            <RiSlackLine className="icon" />
            <span>Shop</span>
          </div>
          <button onClick={() => setIsShort((prevState) => !prevState)}>
            <RiArrowLeftDoubleFill className="icon" />
          </button>
        </div>
        <div className={styles.list}>
          {links.map(({ url, icon, name }) => (
            <Link key={url} href={url} className={styles.link}>
              <div
                className={`icon ${url === location ? styles.selected : ""}`}>
                {icon}
              </div>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.logout}>
        <button onClick={logoutHandler}>
          <RiLogoutBoxRLine className="icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
