import { gql } from "@apollo/client";

export const ORDERS = gql`
    query Orders($filter: OrderFilterInput) {
        orders(filter: $filter) {
            id
            status
            created_at
            total_price
            user {
                first_name
                last_name
                email
            }
        }
    }`;

export const ORDER = gql`
    query Order($id: Int!) {
        order(id: $id) {
            id
            status
            total_price
            created_at
            updated_at
            user {
                first_name
                last_name
                email
                phone
                address
            }
            order_items {
                id
                product_variant {
                    id
                    price
                    product {
                        name
                    }
                    variant_attribute_values {
                        name
                        value
                    }
                }
                quantity
                price
            }
        }
    }`;


export const DELETE_ORDER = gql`
    mutation deleteOrder($id: Int!) {
        deleteOrder(id: $id) {
            id
        }
    }`;

