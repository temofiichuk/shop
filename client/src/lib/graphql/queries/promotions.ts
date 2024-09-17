import { gql } from "@apollo/client";

export const PROMOTIONS = gql`
    query Promotions {
        promotions {
            name
            discount_type
            start_date
            end_data
            created_at
        }
    }`;