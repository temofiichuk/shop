import Income from "@/components/admin/Income/Income";
import IncomeChart from "@/components/admin/IncomeChart/IncomeChart";

const Dashboard = () => {
	return (
		<section
			className="flex flex-wrap xl:flex-nowrap flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 opacity-100 animate-in fade-in-0 duration-1000">
			<div className=" w-full grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 transition-all">
				<div className="grid gap-4 auto-rows-max sm:grid-cols-2 xl:grid-cols-3 ">
					<div className="col-span-3 md:col-span-1">
						<Income period="week" />
					</div>
					<div className="col-span-3 md:col-span-1">
						<Income period="month" />
					</div>
					<div className="col-span-3 md:col-span-2">
						<IncomeChart period="year" />
					</div>
				</div>
			</div>
		</section>
	);
};

Dashboard.displayName = "Dashboard";
export default Dashboard;