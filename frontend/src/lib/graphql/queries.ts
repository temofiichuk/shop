import { gql } from "@apollo/client";
import {
	authFragment,
	productCategoryFragment,
	productCategoryWithChildrenFragment,
	productFragment,
} from "@/lib/graphql/fragments";

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

export const GET_CATEGORY_TREE = gql`
	query {
		getCategoryTree {
			...productCatWithChildrenAttrs
		}
	}
	${productCategoryWithChildrenFragment}
`;

export const GET_CATEGORIES = gql`
	query getCategories($parent_id: Float) {
		getCategories(parent_id: $parent_id) {
			id
			name
			parent_id
			type_name
		}
	}
`;

export const GET_CATEGORY_TYPES = gql`
	query {
		getCategoryTypes {
			id
			name
		}
	}
`;

export const CREATE_CATEGORY = gql`
	mutation categoryCreate($createCategoryInput: CreateCategoryInput!) {
		createCategory(createCategoryInput: $createCategoryInput) {
			id
		}
	}
`;

export const REMOVE_CATEGORY = gql`
	mutation categoryRemove($id: Float!) {
		removeCategory(id: $id) {
			id
		}
	}
`;
export const UPDATE_CATEGORY = gql`
	mutation categoryUpdate($updateCategoryInput: UpdateCategoryInput!) {
		updateCategory(updateCategoryInput: $updateCategoryInput) {
			id
		}
	}
`;
