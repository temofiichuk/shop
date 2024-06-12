"use client";
import styles from "./AdminNavList.module.scss";
import { MenuItem, Typography } from "@material-tailwind/react";
import { createElement, HTMLAttributes } from "react";
import {
	CodeBracketSquareIcon,
	CubeTransparentIcon,
	Square3Stack3DIcon,
	ListBulletIcon,
	SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import useOpen from "@/lib/hooks/useOpen";

const adminHref = "/admin";
const adminDashboardHref = `${adminHref}/dashboard`;

const navListItems = [
	{
		label: "Dashboard",
		icon: Square3Stack3DIcon,
		href: `${adminDashboardHref}`,
	},
	{
		label: "Products",
		icon: SquaresPlusIcon,
		href: `${adminDashboardHref}/products`,
	},
	{
		label: "Categories",
		icon: ListBulletIcon,
		href: `${adminDashboardHref}/categories`,
	},
	{
		label: "Statistics",
		icon: CubeTransparentIcon,
		href: `${adminDashboardHref}/statistics`,
	},
	{
		label: "Docs",
		icon: CodeBracketSquareIcon,
		href: `${adminDashboardHref}/docs`,
	},
];

const AdminNavList = () => {
	const [, setIsNavOpen] = useOpen("navbar");

	return (
		<ul className={styles.list}>
			{navListItems.map(({ label, icon, href }) => (
				<Link href={href} key={href} className={styles.link} onClick={() => setIsNavOpen(false)}>
					<MenuItem className={styles.item}>
						{createElement(icon, { className: styles.icon })}
						<span className={styles.label}> {label}</span>
					</MenuItem>
				</Link>
			))}
		</ul>
	);
};

export default AdminNavList;
