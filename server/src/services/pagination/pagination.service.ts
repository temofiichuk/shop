import { Injectable } from "@nestjs/common";

@Injectable()
export class PaginationService {
	getPagination(take: number = 12, page: number) {
		if (!take || !page) return null;
		const skip = (page - 1) * take;
		return { skip, take };
	};
}
