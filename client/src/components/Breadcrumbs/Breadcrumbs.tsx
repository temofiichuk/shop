"use client";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface IBreadcrumbs {
	className?: string;
}

const Breadcrumbs = ({ className }: IBreadcrumbs) => {
	const paths = usePathname();
	const pathNames = paths.split("/").filter(path => path);

	return (
		<Breadcrumb className={className}>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href={"/"}>Shop</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				{pathNames.length > 0 && <BreadcrumbSeparator />}

				{pathNames.map((link, index) => {
					let href = `/${pathNames.slice(0, index + 1).join("/")}`;
					let itemLink = link[0].toUpperCase() + link.slice(1, link.length);

					if (index + 1 === pathNames.length) {
						return <BreadcrumbItem key={link}>
							<BreadcrumbPage>{itemLink}</BreadcrumbPage>
						</BreadcrumbItem>;
					}

					return (
						<Fragment key={link}>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href={href}>{itemLink}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{pathNames.length !== index + 1 && <BreadcrumbSeparator />}
						</Fragment>
					);
				})}


			</BreadcrumbList>
		</Breadcrumb>
	);
};

Breadcrumbs.displayName = "Breadcrumbs";
export default Breadcrumbs;