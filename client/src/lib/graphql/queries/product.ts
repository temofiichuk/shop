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


export const PRODUCTS_COUNT = gql`
    query productsCount {
        productsCount {
            count
        }
    }`;