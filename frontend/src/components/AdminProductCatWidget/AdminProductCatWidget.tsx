import styles from "./AdminProductCatWidget.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldName, FieldValues, useFormContext, useWatch } from "react-hook-form";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
	CREATE_CATEGORY,
	CREATE_SUBCATEGORY,
	GET_CATEGORIES,
	GET_SUBCATEGORIES,
	GET_GROUPS,
	GET_TYPES,
	CREATE_GROUP,
	CREATE_TYPE,
} from "@/lib/graphql/queries";
import { Category, Subcategory, Group, Type as ProductType } from "@/types/types";
import AdminControlledSelect from "@/components/AdminControlledSelect/AdminControlledSelect";
import { Button, ButtonGroup, Card } from "@material-tailwind/react";
import resetFields from "@/utils/resetFieldsHelper";

type MapOptions = (val: { id: number; name: string }) => { value: string; label: string };

const mapOptions: MapOptions = ({ id, name }) => ({
	value: id.toString(),
	label: name,
});

const AdminProductCatWidget = () => {
	const [isShownFields, setIsShownFields] = useState({
		subcategory: false,
		group: false,
	});

	const { resetField } = useFormContext();

	// Fetching
	const { data: categories, refetch: refetchCategories } = useQuery<{
		categoryGetAll: Category[];
	}>(GET_CATEGORIES);

	const [
		fetchSubcategories,
		{ data: subcategories, refetch: refetchSubcategories, loading: loadingSubcategories },
	] = useLazyQuery<{
		subcategoryGetAll: Subcategory[];
	}>(GET_SUBCATEGORIES);

	const [
		fetchGroups,
		{ data: groups, refetch: refetchGroups, error: errorGroup, loading: loadingGroups },
	] = useLazyQuery<{
		findAllGroups: Group[];
	}>(GET_GROUPS);

	const [fetchProductTypes, { data: productTypes, refetch: refetchProductTypes }] = useLazyQuery<{
		findAllTypes: ProductType[];
	}>(GET_TYPES);

	// Creating
	const [
		createCategory,
		{ data: createdCategory, loading: createCatLoading, error: createCatError },
	] = useMutation<{
		categoryCreate: Category[];
	}>(CREATE_CATEGORY);

	const [
		createSubcategory,
		{ data: createdSubcategory, loading: createSubcatLoading, error: createSubcatError },
	] = useMutation<{
		subcategoryCreate: Subcategory[];
	}>(CREATE_SUBCATEGORY);

	const [
		createGroup,
		{ data: createdGroup, loading: createGroupLoading, error: createGroupError },
	] = useMutation<{
		createGroup: Group[];
	}>(CREATE_GROUP);

	const [
		createProductType,
		{ data: createdProductType, loading: createTypeLoading, error: createTypeError },
	] = useMutation<{
		createType: ProductType[];
	}>(CREATE_TYPE);

	// Watching
	const catID = useWatch({ name: "category_id" });
	const subcatID = useWatch({ name: "subcategory_id" });
	const groupID = useWatch({ name: "group_id" });

	// Memoization
	const categoriesOptions = useMemo(() => {
		return categories?.categoryGetAll.map(mapOptions);
	}, [categories]);

	const subcategoriesOptions = useMemo(() => {
		return subcategories?.subcategoryGetAll.map(mapOptions);
	}, [subcategories]);

	const groupsOptions = useMemo(() => {
		return groups?.findAllGroups.map(mapOptions);
	}, [groups]);

	const typesOptions = useMemo(() => {
		return productTypes?.findAllTypes.map(mapOptions);
	}, [productTypes]);

	const createCategoryHandler = useCallback(
		(value: string) => createCategory({ variables: { createCategoryInput: { name: value } } }),
		[]
	);

	const createSubcategoryHandler = useCallback(
		(value: string) =>
			createSubcategory({
				variables: { createSubcategoryInput: { name: value, category_id: +catID } },
			}),
		[catID]
	);

	const createGroupHandler = useCallback(
		(value: string) => {
			if (subcatID && subcatID !== 0) {
				createGroup({
					variables: { createGroupInput: { name: value, subcategory_id: +subcatID } },
				});
				return;
			}
			createGroup({
				variables: { createGroupInput: { name: value, category_id: +catID } },
			});
		},
		[subcatID, catID]
	);

	const createProductTypeHandler = useCallback(
		(value: string) =>
			createProductType({
				variables: { createTypeInput: { name: value, group_id: +groupID } },
			}),
		[groupID]
	);

	// ReFetching
	useEffect(() => {
		if (!createdCategory) return;
		refetchCategories();
	}, [createdCategory]);

	useEffect(() => {
		if (!createdSubcategory) return;
		refetchSubcategories();
	}, [createdSubcategory]);

	useEffect(() => {
		if (!createdGroup) return;
		refetchGroups();
	}, [createdGroup]);

	useEffect(() => {
		if (!createdProductType) return;
		refetchProductTypes();
	}, [createdProductType]);

	// Fetching after Select
	useEffect(() => {
		resetFields(["subcategory_id", "group_id", "type_id"], resetField);

		if (catID === 0) return;
		const options = { variables: { category_id: +catID } };
		setIsShownFields({ subcategory: false, group: false });
		fetchSubcategories(options);
		fetchGroups(options);
	}, [catID]);

	useEffect(() => {
		resetFields(["group_id", "type_id"], resetField);
		setIsShownFields({ subcategory: true, group: false });
		if (subcatID === 0) return;
		fetchGroups({ variables: { subcategory_id: +subcatID } });
	}, [subcatID]);

	useEffect(() => {
		resetField("type_id");
		if (groupID === 0) return;
		fetchProductTypes({ variables: { group_id: +groupID } });
	}, [groupID]);

	useEffect(() => {
		setIsShownFields({
			subcategory: !!subcategories && subcategories?.subcategoryGetAll.length > 0,
			group: !!groups && groups?.findAllGroups.length > 0,
		});
	}, [subcategories, groups]);

	// Comparisons
	const isSubcategory = !!subcategoriesOptions && catID !== 0 && !loadingSubcategories;
	const isGroup = !!groupsOptions && (subcatID !== 0 || catID !== 0) && !loadingGroups;
	const isType = (subcatID !== 0 || catID !== 0) && !!typesOptions && groupID !== 0;
	const isShownButtons =
		catID !== 0 &&
		!isShownFields.group &&
		!isShownFields.subcategory &&
		!loadingSubcategories &&
		!loadingGroups;

	return (
		<Card className={styles.wrapper}>
			{categoriesOptions && (
				<AdminControlledSelect
					label="Category"
					name="category_id"
					options={categoriesOptions}
					onCreateOption={createCategoryHandler}
					isLoading={createCatLoading}
				/>
			)}
			{isShownButtons && (
				<ButtonGroup size={"sm"} className={"m-auto"}>
					<Button onClick={() => setIsShownFields({ subcategory: true, group: false })}>
						Add Subcategory
					</Button>
					<Button onClick={() => setIsShownFields({ subcategory: false, group: true })}>
						Add Group
					</Button>
				</ButtonGroup>
			)}
			{isSubcategory && isShownFields.subcategory && (
				<AdminControlledSelect
					label="Subcategory"
					name="subcategory_id"
					options={subcategoriesOptions}
					onCreateOption={createSubcategoryHandler}
					isLoading={createSubcatLoading}
				/>
			)}
			{isGroup && isShownFields.group && (
				<AdminControlledSelect
					label="Group"
					name="group_id"
					options={groupsOptions}
					onCreateOption={createGroupHandler}
					isLoading={createGroupLoading}
				/>
			)}
			{isType && (
				<AdminControlledSelect
					label="Type"
					name="type_id"
					options={typesOptions}
					onCreateOption={createProductTypeHandler}
					isLoading={createTypeLoading}
				/>
			)}
		</Card>
	);
};

AdminProductCatWidget.displayName = "AdminProductCatWidget";
export default AdminProductCatWidget;
