import { gql } from "@apollo/client";

export const REVIEWS = gql`query reviews {
    reviews {
        user {
            email
        }
        product {
            name
        }
        id
        created_at
        status
        comment
    }
}`;