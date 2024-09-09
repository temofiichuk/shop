import { gql } from "@apollo/client";

export const ATTRIBUTES = gql`
    query attributes {
        productAttributes {
            id
            name
            created_at
            values {
                id
                value
            }
        }
    }`;