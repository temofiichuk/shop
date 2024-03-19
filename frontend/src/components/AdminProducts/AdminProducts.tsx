"use client";

import styles from "./AdminProducts.module.scss";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_COUNT } from "@/lib/graphql/queries";
import { Suspense, useCallback, useMemo, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { getPagination } from "@/utils/paginationHelper";
import { Card, Option, Select } from "@material-tailwind/react";

import Spinner from "@/components/Spinner/Spinner";
import AdminSearchProducts from "@/components/AdminSearchProducts/AdminSearchProducts";
import AdminProductsList from "@/components/AdminProductsList/AdminProductsList";

const numberOfVisible = [10, 15, 20, 50];

const AdminProducts = () => {
	const [take, setTake] = useState<number>(15);
	const [page, setPage] = useState<number>(1);

	const { data, refetch } = useQuery<{ productCount: number }>(GET_PRODUCTS_COUNT);

	const pagination = useMemo(() => getPagination(page, take), [page, take]);

	const refetchPagination = useCallback(
		(changePage = false) => {
			if (changePage) setPage((prevState) => prevState - 1);
			refetch();
		},
		[refetch]
	);

	return (
		<Card className={styles.products}>
			<div className={styles.widgets}>
				<div className={styles.quantity}>
					<Select
						label="Number of products"
						value={take.toString()}
						onChange={(value) => value && setTake(+value)}>
						{numberOfVisible.map((num) => (
							<Option value={num.toString()}>{num}</Option>
						))}
					</Select>
				</div>
				<div className={styles.search}>
					<AdminSearchProducts />
				</div>
			</div>
			<Suspense fallback={<Spinner width={50} />}>
				<AdminProductsList pagination={pagination} refetchPagination={refetchPagination} />
			</Suspense>
			<div className={styles.pagination}>
				{data && (
					<Pagination
						visibleButtons={5}
						active={page}
						setActive={setPage}
						take={take}
						count={data.productCount}
					/>
				)}
			</div>
		</Card>
	);
};

export default AdminProducts;
