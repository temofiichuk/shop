import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
    query {
        products {
            name
        }
    }`;