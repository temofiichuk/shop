import OrdersList from "@/components/admin/OrdersList/OrdersList.client";
import CurrentOrder from "@/components/admin/CurrentOrder/CurrentOrder";

const Orders = () => {
	return (
		<section
			className="flex flex-wrap xl:flex-nowrap flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 opacity-100 animate-in fade-in-0 duration-1000">
			<div className=" w-full grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 transition-all">
				<OrdersList />
			</div>
			<CurrentOrder />
		</section>
	);
};

export default Orders;
