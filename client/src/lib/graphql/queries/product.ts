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

export const PRODUCT_FRAGMENT = gql`
    fragment ProductFragment on Product {
        id
        name
        description
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
            sku
            variant_attributes {
                name
                value
            }
        }
        attributes {
            id
            name
            values {
                value
            }
        }
        categories {
            id
        }
    }
`;

export const PRODUCT = gql`
    query product($id: Int!) {
        product(id: $id) {
            ...ProductFragment
        }
    }
    ${PRODUCT_FRAGMENT}
`;

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($data: UpdateProductInput!) {
        updateProduct(data: $data) {
            ...ProductFragment
        }
    }
    ${PRODUCT_FRAGMENT}
`;

export const CREATE_PRODUCT = gql`
    mutation createProduct($data: CreateProductInput!) {
        createProduct(data: $data) {
            ...ProductFragment
        }
    }
    ${PRODUCT_FRAGMENT}
`;

export const PRODUCTS_COUNT = gql`
    query productsCount {
        productsCount {
            count
        }
    }`;