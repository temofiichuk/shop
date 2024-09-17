import { gql } from "@apollo/client";

export const CUSTOMERS = gql`
    query users {
        users {
            first_name
            last_name
            is_verified
            email
            image
            rating
            created_at
        }
    }
`;

export const CUSTOMER = gql`
    query user($id: Int!) {
        userById(id: $id) {
            first_name
            last_name
            is_verified
            email
            image
            rating
            created_at
        }
    }
`;