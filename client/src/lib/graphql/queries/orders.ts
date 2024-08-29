import { gql } from "@apollo/client";

export const ORDERS = gql`
    query OrdersQuery {
        orders {
            id
            status
        }
    }`;


export const ORDER = gql`
    query OrderQuery($id: Int!) {
        order(id: $id) {
            id
            status
            total_price
            order_items {
                total_price
                product_variant_id
            }
        }
    }`;