"use client";
import styles from "./NavMenu.module.scss";
import { useQuery } from "@apollo/client";
import { Category } from "@/types/types";
import { GET_CATEGORIES } from "@/lib/graphql/queries";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMemo, useState } from "react";
import { shallowEqual } from "react-redux";
import { setIsOpen } from "@/store/features/is-open.slice";

const NavMenu = () => {
	const { data } = useQuery<{ categoryGetAll: Category[] }>(GET_CATEGORIES);
	const { currentPage, isNavOpen, isNavMobileOpen } = useAppSelector(
		({ currentPage, isOpen: { navMenu, navMenuMobile } }) => ({
			currentPage: currentPage.slug,
			isNavOpen: navMenu,
			isNavMobileOpen: navMenuMobile,
		}),
		shallowEqual
	);

	const dispatch = useAppDispatch();

	const [selectedCat, setSelectedCat] = useState(currentPage);
	const [focusedCat, setFocusedCat] = useState<boolean | string>(false);

	const subcategories = useMemo(
		() => data?.categoryGetAll.find((cat) => cat.slug === selectedCat)?.subcategories,
		[data, selectedCat]
	);

	return (
		<div className={styles.nav}>
			{isNavOpen && (
				<div
					onMouseLeave={() => dispatch(setIsOpen({ navMenu: false }))}
					className={styles.navDesktop}>
					<nav className={styles.desktopMain}>
						<ul>
							{data?.categoryGetAll.map((cat) => (
								<li
									key={cat.id}
									data-active={cat.slug === selectedCat}
									onClick={() => setSelectedCat(cat.slug)}>
									{cat.name}
								</li>
							))}
						</ul>
					</nav>

					<nav className={styles.sub}>
						<ul>
							{subcategories?.map((cat) => (
								<li key={cat.id}>
									<span>{cat.name}</span>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}

			{isNavMobileOpen && (
				<div className={styles.navMobile}>
					<nav className={styles.main}>
						<ul>
							{data?.categoryGetAll.map((cat) => (
								<li
									key={cat.id}
									data-active={cat.slug === selectedCat}
									onClick={() => setSelectedCat(cat.slug)}>
									{cat.name}
								</li>
							))}
						</ul>
					</nav>

					<nav className={styles.sub}>
						<ul>
							{subcategories?.map((cat) => (
								<li key={cat.id}>
									<span>{cat.name}</span>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</div>
	);
};

export default NavMenu;
