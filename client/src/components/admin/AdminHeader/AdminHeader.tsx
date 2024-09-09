import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Package2, PanelLeft, Search, User } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import Breadcrumbs from "@/components/admin/Breadcrumbs/Breadcrumbs";
import { signOut as authSignOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { adminNavigation } from "@/components/admin/AdminSidebar/AdminSidebar";

const AdminHeader = () => {
	const navItems = [...adminNavigation];
	const lastNavItem = navItems.splice(adminNavigation.length - 1)[0];
	return (
		<header
			className="p-3 backdrop-blur-2xl flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline" className="sm:hidden">
						<PanelLeft className="h-5 w-5" />
						<span className="sr-only">Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="h-full flex flex-col sm:max-w-xs text-lg font-medium"
											aria-describedby={"admin dashboard navigation"}>
					<nav className="grid gap-6  ">

						<SheetTitle>
							<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
							<span className="sr-only">My Shop Inc.</span>
						</SheetTitle>

						{navItems.map(({ href, title, Icon }) => (
							<Link
								href={href}
								className="flex items-center gap-4 px-2.5 hover:text-foreground"
							>
								<Icon className="h-5 w-5" />
								{title}
							</Link>
						))}
					</nav>
					<nav className="mt-auto">
						<Link
							href={lastNavItem.href}
							className="flex items-center gap-4 px-2.5 hover:text-foreground"
						>
							<lastNavItem.Icon className="h-5 w-5" />
							{lastNavItem.title}
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