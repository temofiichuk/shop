import ManageProduct from "@/containers/ManageProduct/ManageProduct";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = ({ children, searchParams }: Props) => (
	<ManageProduct searchParams={searchParams}>{children}</ManageProduct>
);
export default Page;