import { gql } from "@apollo/client";

export const productDescriptionFragment = gql`
	fragment productDescAttrs on ProductDescription {
		id
		head
		body
	}
`;

export const productImageFragment = gql`
	fragment productImgAttrs on ProductImage {
		name
		url
		is_main
	}
`;

export const productCategoryFragment = gql`
	fragment productCatAttrs on Category {
		id
		name
		parent_id
	}
`;

export const productCategoryWithChildrenFragment = gql`
	fragment productCatWithChildrenAttrs on Category {
		id
		name
		parent_id
		children {
			id
			name
			parent_id
			children {
				id
				name
				parent_id

				children {
					id
					name
					parent_id
					children {
						id
						name
						parent_id
					}
				}
			}
		}
	}
`;

export const productFragment = gql`
	fragment productAttrs on Product {
		name
		price
		slug
		stock
		descriptions {
			...productDescAttrs
		}
		images {
			...productImgAttrs
		}
		categories {
			...productCatAttrs
		}
	}
	${productDescriptionFragment}
	${productImageFragment}
	${productCategoryFragment}
`;

export const authFragment = gql`
	fragment authAttrs on AuthData {
		user {
			id
			name
			email
			role
		}
		refreshToken
		accessToken
	}
`;
