import styles from "./AdminProductsList.module.scss";
import { useRouter } from "next/navigation";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { Product, ProductWithID } from "@/types/types";
import { GET_PRODUCTS, REMOVE_PRODUCT } from "@/lib/graphql/queries";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { EnumMessage, setMessage } from "@/store/features/message.slice";
import { IconButton, List, ListItem, ListItemSuffix } from "@material-tailwind/react";
import { RiDeleteBin7Fill, RiEditFill } from "react-icons/ri";

interface IAdminProductsList {
	pagination: {
		skip: number;
		take: number;
	};
	refetchPagination: (changePage?: boolean) => void;
}

const AdminProductsList = ({ pagination, refetchPagination }: IAdminProductsList) => {
	const router = useRouter();
	const { data, refetch } = useSuspenseQuery<{ productGetMany: ProductWithID[] }>(GET_PRODUCTS, {
		variables: pagination,
	});
	const [removeProduct, { data: removedProduct, loading, error }] = useMutation<{
		productRemove: Pick<Product, "name">;
	}>(REMOVE_PRODUCT);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!removedProduct) return;
		refetch();
		dispatch(
			setMessage({
				value: `${removedProduct.productRemove.name} was removed!`,
				type: EnumMessage.SUCCESS,
			})
		);
	}, [removedProduct]);

	useEffect(() => {
		refetchPagination(data.productGetMany.length < 1);
	}, [data]);

	useEffect(() => {
		if (!error) return;

		dispatch(
			setMessage({
				value: `Something went wrong! Try again`,
				type: EnumMessage.FAILURE,
			})
		);
	}, [error]);

	return (
		<List className={styles.list}>
			{data.productGetMany?.map(({ id, name }) => {
				return (
					<ListItem key={id} ripple={false} className={styles.item}>
						{name}
						<ListItemSuffix className="sm:flex">
							<IconButton
								variant="text"
								color="blue-gray"
								disabled={loading}
								onClick={() => removeProduct({ variables: { id } })}>
								<RiDeleteBin7Fill />
							</IconButton>
							<IconButton
								variant="text"
								color="blue-gray"
								onClick={() => router.push(`products/manage?product_id=${id}`)}>
								<RiEditFill />
							</IconButton>
						</ListItemSuffix>
					</ListItem>
				);
			})}
		</List>
	);
};

AdminProductsList.displayName = "AdminProductsList";
export default AdminProductsList;
