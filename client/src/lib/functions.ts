import moment from "moment/moment";

export const toRegularCase = (text: string) => {
	return (text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()).replace(
		"_",
		" ",
	);
};

export const USD = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

export const date = () => {
	const now = moment();
	const weekAgo = now.clone().subtract(1, "week").format("YYYY-MM-DD");
	const monthAgo = now.clone().subtract(1, "month").format("YYYY-MM-DD");
	const yearAgo = now.clone().subtract(1, "year").format("YYYY-MM-DD");
	return { weekAgo, monthAgo, yearAgo };
};

