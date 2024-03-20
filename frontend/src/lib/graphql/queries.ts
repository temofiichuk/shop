import { gql } from "@apollo/client";
import { authFragment, productFragment } from "@/lib/graphql/fragments";

// ------------ USER ----------- //

export const GET_NEW_TOKENS = gql`
	query getNewTokens($refreshToken: String!) {
		authNewTokens(refresh_token: $refreshToken) {
			...authAttrs
		}
	}
	${authFragment}
`;

export const USER_LOGIN = gql`
	query authLogin($loginUserInput: LoginUserInput!) {
		authLogin(loginInput: $loginUserInput) {
			...authAttrs
		}
	}
	${authFragment}
`;

export const ADMIN_LOGIN = gql`
	query authAdminLogin($loginAdminInput: LoginAdminInput!) {
		authAdminLogin(loginAdminInput: $loginAdminInput) {
			...authAttrs
		}
	}
	${authFragment}
`;

export const USER_REGISTER = gql`
	mutation userCreate($createUserInput: CreateUserInput!) {
		userCreate(createUserInput: $createUserInput) {
			message
		}
	}
`;

export const GET_CURRENT_ADMIN_AVATAR = gql`
	query {
		adminGetAvatar {
			avatar
		}
	}
`;

// ----------- PRODUCT ------------- //

export const CREATE_PRODUCT = gql`
	mutation productCreate($createProductInput: CreateProductInput!) {
		productCreate(createProductInput: $createProductInput) {
			...productAttrs
		}
	}
	${productFragment}
`;

export const UPDATE_PRODUCT = gql`
	mutation productUpdate($updateProductInput: UpdateProductInput!) {
		productUpdate(updateProductInput: $updateProductInput) {
			...productAttrs
		}
	}
	${productFragment}
`;

export const GET_PRODUCTS = gql`
	query getProducts($skip: Float!, $take: Float!) {
		productGetMany(skip: $skip, take: $take) {
			id
			...productAttrs
		}
	}
	${productFragment}
`;

export const GET_PRODUCT = gql`
	query getProductByID($id: Float!) {
		productGetByID(id: $id) {
			...productAttrs
		}
	}
	${productFragment}
`;

export const SEARCH_PRODUCTS = gql`
	query searchProduct($pattern: String!) {
		productBySearch(pattern: $pattern) {
			id
			name
		}
	}
`;

export const GET_PRODUCTS_COUNT = gql`
	query {
		productCount
	}
`;

export const REMOVE_PRODUCT = gql`
	mutation productRemove($id: Float!) {
		productRemove(id: $id) {
			name
		}
	}
`;

// ----------- CATEGORIES -------------- //

export const GET_CATEGORIES = gql`
	query {
		categoryGetAll {
			id
			name
			slug
		}
	}
`;

export const CREATE_CATEGORY = gql`
	mutation categoryCreate($createCategoryInput: CreateCategoryInput!) {
		categoryCreate(createCategoryInput: $createCategoryInput) {
			id
		}
	}
`;

export const REMOVE_CATEGORY = gql`
	mutation categoryRemove($id: Float!) {
		categoryRemove(id: $id) {
			id
		}
	}
`;
export const UPDATE_CATEGORY = gql`
	mutation categoryUpdate($updateCategoryInput: UpdateCategoryInput!) {
		categoryUpdate(updateCategoryInput: $updateCategoryInput) {
			id
		}
	}
`;

// ----------- SUBCATEGORIES -------------- //

export const GET_SUBCATEGORIES = gql`
	query subcategoryGetAll($category_id: Float!) {
		subcategoryGetAll(category_id: $category_id) {
			id
			name
			slug
		}
	}
`;

export const CREATE_SUBCATEGORY = gql`
	mutation subcategoryCreate($createSubcategoryInput: CreateSubcategoryInput!) {
		subcategoryCreate(createSubcategoryInput: $createSubcategoryInput) {
			id
		}
	}
`;

export const REMOVE_SUBCATEGORY = gql`
	mutation subcategoryRemove($id: Float!) {
		subcategoryRemove(id: $id) {
			id
		}
	}
`;
export const UPDATE_SUBCATEGORY = gql`
	mutation subcategoryUpdate($updateSubcategoryInput: UpdateSubcategoryInput!) {
		subcategoryUpdate(updateSubcategoryInput: $updateSubcategoryInput) {
			id
		}
	}
`;

// ----------- GROUPS -------------- //

export const GET_GROUPS = gql`
	query getAllGroups($category_id: Float, $subcategory_id: Float) {
		findAllGroups(category_id: $category_id, subcategory_id: $subcategory_id) {
			id
			name
			slug
		}
	}
`;

export const CREATE_GROUP = gql`
	mutation createGroup($createGroupInput: CreateGroupInput!) {
		createGroup(createGroupInput: $createGroupInput) {
			id
		}
	}
`;

export const REMOVE_GROUP = gql`
	mutation removeGroup($id: Float!) {
		removeGroup(id: $id) {
			id
		}
	}
`;

export const UPDATE_GROUP = gql`
	mutation updateGroup($updateGroupInput: UpdateGroupInput!) {
		updateGroup(updateGroupInput: $updateGroupInput) {
			id
		}
	}
`;

// ----------- TYPES -------------- //

export const GET_TYPES = gql`
	query getAllTypes($group_id: Float!) {
		findAllTypes(group_id: $group_id) {
			id
			name
			slug
		}
	}
`;

export const CREATE_TYPE = gql`
	mutation createType($createTypeInput: CreateTypeInput!) {
		createType(createTypeInput: $createTypeInput) {
			id
		}
	}
`;

export const REMOVE_TYPE = gql`
	mutation removeType($id: Int!) {
		removeType(id: $id) {
			id
		}
	}
`;

export const UPDATE_TYPE = gql`
	mutation updateType($updateTypeInput: UpdateTypeInput!) {
		updateType(updateTypeInput: $updateTypeInput) {
			id
		}
	}
`;
