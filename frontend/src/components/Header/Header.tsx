"use client";
import styles from "./Header.module.scss";
import Link from "next/link";
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	PlusIcon,
	ShoppingBagIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { EnumUserRole } from "@/types/enums";
import { useQuery } from "@apollo/client";
import { Category } from "@/types/types";
import { GET_CATEGORIES } from "@/lib/graphql/queries";
import { setIsOpen, toggleIsOpen } from "@/store/features/is-open.slice";
import { useMemo } from "react";
import { shallowEqual } from "react-redux";

const Header = () => {
	const { data } = useQuery<{ categoryGetAll: Category[] }>(GET_CATEGORIES);
	const { isUserAuth, currentPage, isNavMobileOpen } = useAppSelector(
		({ auth, currentPage, isOpen }) => ({
			isUserAuth: auth.user && auth.user?.role === EnumUserRole.USER,
			currentPage: currentPage.slug,
			isNavMobileOpen: isOpen.navMenuMobile,
		}),
		shallowEqual
	);

	const dispatch = useAppDispatch();

	const listOfNavs = useMemo(() => {
		return data?.categoryGetAll.map(({ id, slug, name }) => (
			<Link key={id} href={`${slug}`} onMouseEnter={() => dispatch(setIsOpen({ navMenu: true }))}>
				<span data-active={currentPage === slug}>{name}</span>
			</Link>
		));
	}, [data, currentPage]);

	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<div className={`${styles.nav} ${styles.navMenu}`}>
					<button className={"md:hidden"} onClick={() => dispatch(toggleIsOpen("navMenuMobile"))}>
						{!isNavMobileOpen ? (
							<Bars3Icon width={30} />
						) : (
							<PlusIcon width={30} className="rotate-45" />
						)}
					</button>
					<nav className={styles.navList}>{listOfNavs}</nav>
				</div>

				<div className={styles.logo}>
					<span>MANGO</span>
				</div>

				<nav className={`${styles.nav} ${styles.navIcons}`}>
					<button className={styles.buttonNav}>
						<MagnifyingGlassIcon width={20} />
						<span>Search</span>
					</button>
					<Link href={`${isUserAuth ? "/profile" : "/login"}`}>
						<button className={styles.buttonNav}>
							<UserIcon width={20} />
							<span>{isUserAuth ? "Profile" : "Login"}</span>
						</button>
					</Link>
					<button className={styles.buttonNav}>
						<ShoppingBagIcon width={20} />
						<span>Cart</span>
					</button>
				</nav>
			</div>
		</header>
	);
};

Header.displayName = "Header";
export default Header;
