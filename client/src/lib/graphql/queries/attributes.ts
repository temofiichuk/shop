import { gql } from "@apollo/client";

export const ATTRIBUTES = gql`
    query attributes {
        attributes {
            id
            name
            created_at
            values {
                id
                value
            }
        }
    }`;

export const ALL_ATTRIBUTES = gql`
    query all_attributes {
        attributes {
            name
            values {
                value
            }
        }
    }`;