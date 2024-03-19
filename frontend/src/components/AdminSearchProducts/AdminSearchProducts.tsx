import styles from "./AdminSearchProducts.module.scss";
import { Input, List, ListItem } from "@material-tailwind/react";
import { memo, useState } from "react";
import { debounce } from "lodash";
import { useQuery } from "@apollo/client";
import { SEARCH_PRODUCTS } from "@/lib/graphql/queries";
import { Product } from "@/types/types";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const AdminSearchProducts = memo(() => {
	const [term, setTerm] = useState("");

	const { data, loading } = useQuery<{ productBySearch: Product[] }>(SEARCH_PRODUCTS, {
		variables: { pattern: term },
		skip: term.length < 3, // Skip the query for short search terms
	});

	const debounceSetTerm = debounce((value: string) => setTerm(value.trim()), 500);

	return (
		<div className={styles.search}>
			<div className={styles.inputWrapper}>
				<Input
					onChange={(e) => debounceSetTerm(e.target.value)}
					onBlur={() => setTerm("")}
					crossOrigin={undefined}
					className="input"
					label="Search"
				/>
				<span data-loading={loading} className={styles.icon}>
					<MagnifyingGlassIcon width={25} />
				</span>
			</div>
			<div className={styles.listWrapper} aria-hidden={loading}>
				{data && (
					<div className={styles.listContent}>
						<List>
							{data?.productBySearch && data.productBySearch.length > 0 ? (
								data.productBySearch.map(({ id, name }) => (
									<ListItem key={id} className={styles.item}>
										<Link href={`products/manage?product_id=${id}`}>{name}</Link>
									</ListItem>
								))
							) : (
								<ListItem className={styles.item}>No Results</ListItem>
							)}
						</List>
					</div>
				)}
			</div>
		</div>
	);
});

AdminSearchProducts.displayName = "AdminSearchProducts";
export default AdminSearchProducts;
