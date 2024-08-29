import styles from "./AdminSidebar.module.scss";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { Home, LineChart, Package, Settings, ShoppingCart, Users2 } from "lucide-react";


const AdminSidebar = () => {
	return (
		<TooltipProvider>
			<aside
				className={styles.aside}>
				<nav className={styles.nav}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className={styles.link}
							>
								<Home className="h-5 w-5" />
								<span className="sr-only">Dashboard</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Dashboard</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className={styles.link}
							>
								<ShoppingCart className="h-5 w-5" />
								<span className="sr-only">Orders</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Orders</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className={styles.link}
							>
								<Package className="h-5 w-5" />
								<span className="sr-only">Products</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Products</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className={styles.link}
							>
								<Users2 className="h-5 w-5" />
								<span className="sr-only">Customers</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Customers</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className={styles.link}
							>
								<LineChart className="h-5 w-5" />
								<span className="sr-only">Analytics</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Analytics</TooltipContent>
					</Tooltip>
				</nav>

				<nav className={styles.navBottom}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className={styles.link}
							>
								<Settings className="h-5 w-5" />
								<span className="sr-only">Settings</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Settings</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
		</TooltipProvider>
	);
};

AdminSidebar.displayName = "AdminSidebar";
export default AdminSidebar;