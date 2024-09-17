import { gql } from "@apollo/client";

export const REVENUE = gql`
    query Revenue($revenueInput: RevenueInput!) {
        revenue(revenueInput: $revenueInput) {
            current
            previous
        }
    }`;
export const REVENUE_ANALYTICS = gql`
    query RevenueAnalytics($revenueInput: RevenueInput!) {
        revenueAnalytics(revenueInput: $revenueInput) {
            period
            revenue
        }
    }`;