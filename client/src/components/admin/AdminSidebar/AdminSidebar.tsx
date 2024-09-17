import styles from "./AdminSidebar.module.scss";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import RootAdminField from "@/components/admin/RootAdminField/RootAdminField";
import Link from "next/link";
import {
	BadgePercent,
	Blend,
	Home,
	LayoutGrid,
	Package,
	Settings,
	ShoppingCart,
	Star,
	UserCog,
	Users,
} from "lucide-react";
import { Fragment } from "react";

export const adminNavigation = [
	{ title: "Dashboard", href: "/admin/dashboard", Icon: Home },
	{ title: "Orders", href: "/admin/dashboard/orders", Icon: ShoppingCart },
	{ title: "Products", href: "/admin/dashboard/products", Icon: Package },
	{ title: "Categories", href: "/admin/dashboard/categories", Icon: LayoutGrid },
	{ title: "Attributes", href: "/admin/dashboard/attributes", Icon: Blend },
	{ title: "Promotions", href: "/admin/dashboard/promotions", Icon: BadgePercent },
	{ title: "Reviews", href: "/admin/dashboard/reviews", Icon: Star },
	{ title: "Customers", href: "/admin/dashboard/customers", Icon: Users },
	{ title: "Settings", href: "/admin/dashboard/settings", Icon: Settings },
];

const AdminSidebar = () => {
	const navItems = [...adminNavigation];
	const lastNavItem = navItems.splice(adminNavigation.length - 1)[0];

	return (
		<TooltipProvider>
			<aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-zinc-950 sm:flex">
				<nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
					{navItems.map(({ title, href, Icon }) => (
						<Fragment key={title}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										href={href}
										className={styles.link}
									>
										<Icon className="h-5 w-5" />
										<span className="sr-only">{title}</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side="right">{title}</TooltipContent>
							</Tooltip>
						</Fragment>
					))}
					<RootAdminField>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={"/admin/dashboard/admins"}
									className={styles.link}
								>
									<UserCog className="h-5 w-5" />
									<span className="sr-only">Admins</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Admins</TooltipContent>
						</Tooltip></RootAdminField>
				</nav>

				<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href={lastNavItem.href}
								className={styles.link}
							>
								<lastNavItem.Icon className="h-5 w-5" />
								<span className="sr-only">{lastNavItem.title}</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">{lastNavItem.title}</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
		</TooltipProvider>
	);
};

AdminSidebar.displayName = "AdminSidebar";
export default AdminSidebar;