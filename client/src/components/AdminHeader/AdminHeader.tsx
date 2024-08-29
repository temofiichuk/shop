import styles from "./AdminHeader.module.scss";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home, LineChart, Package, Package2, PanelLeft, Search, ShoppingCart, User, Users2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { signOut as authSignOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";

// export const structure = [
// 	{ title: "", link: "/", icon: <Home /> },
// ];

const AdminHeader = () => {
	return (
		<header
			className={styles.header}>
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline" className="sm:hidden">
						<PanelLeft className="h-5 w-5" />
						<span className="sr-only">Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="sm:max-w-xs" aria-describedby={"admin dashboard navigation"}>
					<nav className="grid gap-6 text-lg font-medium">

						<SheetTitle>

							<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
							<span className="sr-only">Acme Inc</span>

						</SheetTitle>
						<Link
							href={"/admin/dashboard"}
							className="flex items-center gap-4 px-2.5 hover:text-foreground"
						>
							<Home className="h-5 w-5" />
							Dashboard
						</Link>
						<Link
							href={"/admin/orders"}
							className="flex items-center gap-4 px-2.5 text-foreground"
						>
							<ShoppingCart className="h-5 w-5" />
							Orders
						</Link>
						<Link
							href={"/admin/products"}
							className="flex items-center gap-4 px-2.5 hover:text-foreground"
						>
							<Package className="h-5 w-5" />
							Products
						</Link>
						<Link
							href={"/admin/customers"}
							className="flex items-center gap-4 px-2.5 hover:text-foreground"
						>
							<Users2 className="h-5 w-5" />
							Customers
						</Link>
						<Link
							href={"/admin/settings"}
							className="flex items-center gap-4 px-2.5 hover:text-foreground"
						>
							<LineChart className="h-5 w-5" />
							Analytics
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<Breadcrumbs className="hidden md:flex" />

			<div className="max-w-[320px] relative ml-auto flex-1 md:grow-0 ">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 " />
				<Input
					type="search"
					placeholder="Search..."
					className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
				/>
			</div>

			<ThemeSwitcher />

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="overflow-hidden rounded-full"
					>
						<User />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem><Link href={"/account"}>My Account</Link></DropdownMenuItem>
					<DropdownMenuSeparator />

					<DropdownMenuItem>
						<form action={async () => {
							"use server";
							try {
								await authSignOut();
							} catch (e) {
								if (isRedirectError(e)) {
									throw e;
								}
							}
						}}>
							<button type="submit">
								Logout
							</button>
						</form>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

AdminHeader.displayName = "AdminHeader";
export default AdminHeader;