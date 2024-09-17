import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import getClient from "@/lib/apollo/apollo.client.rsc";
import { GET_CATEGORIES } from "@/lib/graphql/queries/category";
import { Category } from "@/lib/graphql/generated/graphql";
import { Fragment, HTMLAttributes } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

const getCategoriesHierarhy = async () => {
	const { data } = await getClient().query({ query: GET_CATEGORIES });
	const categoriesMap = new Map<number, Pick<Category, "children">>();

	const roots = [];

	// Process each category in a single loop
	data.categories.forEach(category => {
		const { id, parent_id } = category;
		const categoryNode = { ...category, children: [] } as Category;
		categoriesMap.set(id, categoryNode);

		if (parent_id === null) {
			roots.push(categoryNode);
		} else {
			const parentNode = categoriesMap.get(parent_id);
			if (parentNode) {
				parentNode.children.push(categoryNode);
			} else {
				categoriesMap.set(parent_id, { children: [categoryNode] });
			}
		}
	});

	return roots;
};

const CategoriesPage = async () => {
	const categories = await getCategoriesHierarhy();

	const Categories = ({ categories, ...props }: { categories: Category[] } & HTMLAttributes<HTMLDivElement>) => {
		return categories.map((category, index) => (
			<Fragment key={category.id}>
				{!!category.children.length ?

					<Accordion type="single" collapsible={true} className={"w-full p-0"}>
						<AccordionItem value={category.id.toString()}>
							<ContextMenu>
								<ContextMenuTrigger>
									<AccordionTrigger className="font-medium text-[inherit] select-none py-2 cursor-pointer">
										{category.name}
									</AccordionTrigger>
								</ContextMenuTrigger>
								<ContextMenuContent className="left-12">
									<ContextMenuLabel>{category.name}</ContextMenuLabel>
									<ContextMenuItem>Edit</ContextMenuItem>
									<ContextMenuItem>Trash</ContextMenuItem>
								</ContextMenuContent>
							</ContextMenu>
							<AccordionContent className={"p-0 pl-2 pb-1"}>
								<Categories categories={category.children} />
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					: <ContextMenu>
						<div className="w-full">
							<ContextMenuTrigger
								title={"right-click to open actions "}
								className="w-full font-medium text-sm py-2 cursor-default select-none block">
								{category.name}
							</ContextMenuTrigger>
						</div>
						<ContextMenuContent className="left-12">
							<ContextMenuLabel>{category.name}</ContextMenuLabel>
							<ContextMenuItem>Edit</ContextMenuItem>
							<ContextMenuItem>Trash</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				}
			</Fragment>
		));
	};

	return (
		<main
			className="grid flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8 opacity-100 animate-in fade-in-0 duration-1000">
			<div className="flex items-center">
				<Button size="sm" className="h-7 gap-1">
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Category
						</span>
				</Button>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="flex gap-4 items-center">Categories </CardTitle>
					<div className="flex justify-between items-center text-zinc-500">
						<CardDescription>
							Manage your categories.
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<Categories categories={categories} />
				</CardContent>
			</Card>
		</main>);
};
export default CategoriesPage;
