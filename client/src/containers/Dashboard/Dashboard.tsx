import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import OrdersList from "@/components/admin/OrdersList/OrdersList.client";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import Income from "@/components/admin/Income/Income";

const CurrentOrder = dynamic(() => import( "@/components/admin/CurrentOrder/CurrentOrder"), { ssr: false });

const Dashboard = () => {
	return (
		<main
			className="flex flex-wrap xl:flex-nowrap flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 opacity-100 animate-in fade-in-0 duration-1000">
			<div className=" w-full grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 transition-all">
				<div className="grid gap-4 auto-rows-max sm:grid-cols-2 xl:grid-cols-3 ">

					<Card
						className="sm:col-span-2 xl:col-span-1"
					>
						<CardHeader className="pb-3">
							<CardTitle>Your Orders</CardTitle>
							<CardDescription className="text-balance max-w-lg leading-relaxed">
								Introducing Our Dynamic Orders Dashboard for Seamless
								Management and Insightful Analysis.
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button>Create New Order</Button>
						</CardFooter>
					</Card>
					<div className="sm:col-span-1">
						<Income period="week" />
					</div>
					<div className="sm:col-span-1">

						<Income period="month" />
					</div>

				</div>
				<Suspense fallback={<LoadingSpinner />}>
					<OrdersList />
				</Suspense>
			</div>
			<CurrentOrder />
		</main>
	);
};

Dashboard.displayName = "Dashboard";
export default Dashboard;