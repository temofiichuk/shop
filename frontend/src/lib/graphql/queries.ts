import { gql } from "@apollo/client";
import { authFragment, productFragment } from "@/lib/graphql/fragments";

export const GET_NEW_TOKENS = gql`
	query getNewTokens($refreshToken: String!) {
		authNewTokens(refresh_token: $refreshToken) {
			...authAttrs
		}
	}
	${authFragment}
`;

export const CREATE_PRODUCT = gql`
	mutation productCreate($createProductInput: CreateProductInput!) {
		productCreate(createProductInput: $createProductInput) {
			...productAttrs
		}
	}
	${productFragment}
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

export const GET_PRODUCTS = gql`
	query getProducts($skip: Float!, $take: Float!) {
		productGetMany(skip: $skip, take: $take) {
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

export const GET_PRODUCTS_COUNT = gql`
	query {
		productCount
	}
`;

export const GET_CATEGORIES = gql`
	query {
		categoryGetAll {
			id
			name
			slug
		}
	}
`;

export const GET_SUBCATEGORIES = gql`
	query subcategoryGetAll($id: Float!) {
		subcategoryGetAll(id: $id) {
			id
			name
			slug
		}
	}
`;
