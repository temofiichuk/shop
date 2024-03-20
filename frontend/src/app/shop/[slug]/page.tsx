"use client";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { setPage } from "@/store/features/current-page.slice";

const Page = ({ params }: { params: { slug: string } }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setPage({ slug: params.slug }));
	}, []);

	return <div>{params.slug}</div>;
};

export default Page;
