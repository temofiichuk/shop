"use client";
import { useMutation, useQuery } from "@apollo/client";
import { Category, CategoryTreeResponse, CategoryType } from "@/types/types";
import {
	CREATE_CATEGORY,
	GET_CATEGORY_TREE,
	GET_CATEGORY_TYPES,
	REMOVE_CATEGORY,
	UPDATE_CATEGORY,
} from "@/lib/graphql/queries";
import Spinner from "@/components/Spinner/Spinner";
import {
	Button,
	Card,
	Collapse,
	Input,
	Select,
	Option,
	List,
	ListItem,
	ListItemSuffix,
	IconButton,
	ButtonGroup,
	Popover,
	PopoverHandler,
	PopoverContent,
} from "@material-tailwind/react";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import styles from "./AdminManageCategories.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { TrashIcon } from "@heroicons/react/24/solid";

const CategoryItem = ({
	category,
	...props
}: {
	category: Category;
	types: CategoryType[];
	createCategoryHandler: (name: string, type: string) => void;
	removeCategoryHandler: (id: number) => void;
	updateCategoryHandler: (id: number, type: string) => void;
	initRefetch: () => void;
}) => {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [openAdd, setOpenAdd] = useState(false);
	const [type, setType] = useState<Pick<CategoryType, "name">>({
		name: category.type_name,
	});

	const {
		types,
		createCategoryHandler,
		removeCategoryHandler,
		updateCategoryHandler,
		initRefetch,
	} = props;

	const isChildren = category?.children.length > 0;

	return (
		<ListItem ripple={false} className="py-1 pr-0 pl-4 block ">
			<div className={"flex gap-2 items-center"}>
				<span>{category.name}</span>
				<ListItemSuffix>
					<div className={"flex items-center"}>
						<IconButton variant="text" color="blue-gray">
							<TrashIcon width={20} onClick={() => removeCategoryHandler(category.id)} />
						</IconButton>
						<IconButton variant="text" color="blue-gray">
							<PlusIcon width={20} />
						</IconButton>
						<Popover>
							<PopoverHandler>
								<Button variant="text" color="blue-gray">
									{type.name ?? "Type"}
								</Button>
							</PopoverHandler>
							<PopoverContent>
								<List>
									{types?.map(({ name, id }) => (
										<ListItem
											key={`${category.name}.${id}`}
											onClick={() => updateCategoryHandler(category.id, name)}>
											{name}
										</ListItem>
									))}
								</List>
							</PopoverContent>
						</Popover>
						{isChildren && (
							<IconButton
								variant={"text"}
								color={"blue-gray"}
								onClick={() => setOpen((prevState) => !prevState)}>
								<ChevronRightIcon width={20} className={`${open && styles.open} ${styles.arrow}`} />
							</IconButton>
						)}
					</div>
				</ListItemSuffix>
			</div>
			{isChildren && (
				<Collapse open={open} className={"block pr-0"}>
					<List className={"pr-0"}>
						{category?.children?.map((item) => (
							<CategoryItem key={item.id} category={item} {...props} />
						))}
						{openAdd && (
							<div className={"pl-5 cursor-pointer flex gap-2 pt-5"}>
								<Input
									crossOrigin={undefined}
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<Button
									size={"sm"}
									onClick={() => name !== "" && createCategoryHandler(name, type.name)}>
									Add
								</Button>
							</div>
						)}
					</List>
				</Collapse>
			)}
		</ListItem>
	);
};

// ------------------------------------------------------ //

const AdminManageCategories = () => {
	const [name, setName] = useState("");
	const [type, setType] = useState(false);

	const {
		data: dataCategoryTree,
		loading: loadingCategoryTree,
		error: errorCategoryTree,
		refetch: refetchCategoryTree,
	} = useQuery<CategoryTreeResponse>(GET_CATEGORY_TREE);

	const {
		data: dataCategoryTypes,
		loading: loadingCategoryTypes,
		error: errorCategoryTypes,
		refetch: refetchCategoryTypes,
	} = useQuery(GET_CATEGORY_TYPES);

	const [createCategory, { ...createFields }] = useMutation(CREATE_CATEGORY);
	const [removeCategory, { ...removeFields }] = useMutation(REMOVE_CATEGORY);
	const [updateCategory, { ...updateFields }] = useMutation(UPDATE_CATEGORY);

	const createCategoryHandler = useCallback(
		(name: string) => {
			createCategory({
				variables: { createCategoryInput: { name, parent_id: null, type_name: "root" } },
			}).finally(() => {
				refetchCategoryTree();
			});
		},
		[createCategory]
	);

	const removeCategoryHandler = useCallback(
		(id: number) => {
			removeCategory({
				variables: { id },
			}).finally(() => {
				refetchCategoryTree();
			});
		},
		[removeCategory]
	);
	const updateCategoryHandler = useCallback(
		(id: number, type_name: string) => {
			updateCategory({
				variables: { updateCategoryInput: { id, type_name } },
			}).finally(() => {
				refetchCategoryTree();
			});
		},
		[updateCategory]
	);

	if (loadingCategoryTree || createFields.loading || updateFields.loading || removeFields.loading)
		return <Spinner />;

	return (
		<Card className={"p-5 pl-0"}>
			<List>
				{dataCategoryTree?.getCategoryTree.map((category: Category) => (
					<CategoryItem
						createCategoryHandler={createCategoryHandler}
						removeCategoryHandler={removeCategoryHandler}
						updateCategoryHandler={updateCategoryHandler}
						category={category}
						key={category.id}
						types={dataCategoryTypes?.getCategoryTypes}
						initRefetch={refetchCategoryTypes}
					/>
				))}
			</List>

			<div className={"pl-5 cursor-pointer flex gap-2 pt-5"}>
				<Input crossOrigin={undefined} value={name} onChange={(e) => setName(e.target.value)} />
				<Button size={"sm"} onClick={() => createCategoryHandler(name)}>
					Add
				</Button>
			</div>
		</Card>
	);
};

export default AdminManageCategories;
