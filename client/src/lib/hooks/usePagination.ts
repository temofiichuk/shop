import { useMemo } from "react";

interface UsePaginationProps {
	total: number;
	siblingCount?: number;
	currentPage: number;
	showEdges?: boolean;
}

const usePagination = ({
												 total,
												 siblingCount = 1,
												 currentPage,
												 showEdges = true,
											 }: UsePaginationProps) => {
	const paginationRange = useMemo(() => {
		const totalPageNumbers = siblingCount + 5;

		// Case 1: Total pages less than the page numbers we want to show in pagination
		if (total <= totalPageNumbers) {
			return Array.from({ length: total }, (_, index) => index + 1);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, total);

		const shouldShowLeftEllipsis = leftSiblingIndex > 2;
		const shouldShowRightEllipsis = rightSiblingIndex < total - 2;

		const firstPageIndex = 1;
		const lastPageIndex = total;

		const paginationItems: (number | "ellipsis")[] = [];

		if (showEdges && leftSiblingIndex > firstPageIndex) {
			paginationItems.push(firstPageIndex);
		}

		if (shouldShowLeftEllipsis) {
			paginationItems.push("ellipsis");
		} else {
			for (let i = 2; i < leftSiblingIndex; i++) {
				paginationItems.push(i);
			}
		}

		for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
			paginationItems.push(i);
		}

		if (shouldShowRightEllipsis) {
			paginationItems.push("ellipsis");
		} else {
			for (let i = rightSiblingIndex + 1; i < lastPageIndex; i++) {
				paginationItems.push(i);
			}
		}

		if (showEdges && rightSiblingIndex < lastPageIndex) {
			paginationItems.push(lastPageIndex);
		}

		return paginationItems;
	}, [total, siblingCount, currentPage, showEdges]);

	return paginationRange;
};

export default usePagination;
