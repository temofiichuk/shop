export const getPagination = (page: number, take: number = 10) => {
	const skip = (page - 1) * take;
	return { skip, take };
};
