import styles from "./AdminProducts.module.scss";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PRODUCTS, GET_PRODUCTS_COUNT } from "@/lib/graphql/queries";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import Spinner from "@/components/Spinner/Spinner";
import Pagination from "@/components/Pagination/Pagination";
import { getPagination } from "@/utils/paginationHelper";
import { RiDeleteBin7Fill, RiEditFill } from "react-icons/ri";

import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const AdminProducts = () => {
  const router = useRouter();
  const [fetchProducts, { loading: loadingProducts }] = useLazyQuery<{
    productGetMany: Product[];
  }>(GET_PRODUCTS);
  const { data: count } = useQuery<{
    productCount: number;
  }>(GET_PRODUCTS_COUNT);

  const [products, setProducts] = useState<Product[]>([]);
  const [take, setTake] = useState<number>(10);

  const fetchProductHandler = async (page: number) => {
    const { data: products } = await fetchProducts({
      variables: getPagination(page, take),
    });
    if (!products) return;
    setProducts(products.productGetMany);
  };

  const editHandler = (id: number) => {
    router.push(`products/manage?product_id=${id}`);
  };

  useEffect(() => {
    fetchProductHandler(1);
  }, [take]);

  console.log(products);

  return (
    <>
      <Card className="w-full h-full mt-2 mb-2">
        {loadingProducts && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8">
              <Spinner />
            </div>
          </div>
        )}
        <div className="w-full h-full overflow-scroll">
          <List className={`${styles.productList} w-full`}>
            {products?.map(({ id, name }) => (
              <ListItem
                key={id}
                ripple={false}
                className="py-1 pr-1 pl-4 text-sm">
                {name}
                <ListItemSuffix className="sm:flex">
                  <IconButton variant="text" color="blue-gray">
                    <RiDeleteBin7Fill />
                  </IconButton>
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={() => editHandler(id)}>
                    <RiEditFill />
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
            ))}
          </List>
        </div>
        {count && (
          <Pagination
            take={take}
            count={count.productCount}
            handler={fetchProductHandler}
          />
        )}
      </Card>
    </>
  );
};

export default AdminProducts;
