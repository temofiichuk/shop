import { gql } from "@apollo/client";

export const REVENUE = gql`
    query Revenue($revenueInput: RevenueInput!) {
        revenue(revenueInput: $revenueInput) {
            current
            previous
        }
    }`;