import { gql } from "@apollo/client";

export const PRODUCTS = gql`
    query products($pagination: PaginationInput) {
        products(pagination: $pagination) {
            id
            name
            base_price
            created_at
            stock
            images {
                url
                is_main
                name
            }
        }
    }`;

export const PRODUCT = gql`
    query product($id: Int!) {
        product(id: $id) {
            id
            name
            base_price
            created_at
            stock
            images {
                url
                is_main
                name
            }
            variants {
                id
                stock
                price
                variant_attributes {
                    id
                    name
                    value
                }
            }
            attributes {
                id
                name
                values {
                    id
                    value
                }
            }
        }
    }`;

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($data: UpdateProductInput!) {
        updateProduct(data: $data) {
            id
        }
    }
`;

export const CREATE_PRODUCT = gql`
    mutation createProduct($data: CreateProductInput!) {
        createProduct(data: $data) {
            id
        }
    }
`;

export const PRODUCTS_COUNT = gql`
    query productsCount {
        productsCount {
            count
        }
    }`;