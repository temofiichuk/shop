import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
    query categories {
        categories {
            id
            name
            parent_id
            created_at
        }
    }
`;

export const ADD_CATEGORY = gql`
    mutation createCategory($createCategoryInput: CreateCategoryInput!) {
        createCategory(createCategoryInput: $createCategoryInput) {
            id
            name
            parent_id
            children {
                id
                name
            }
        }
    }
`;

export const EDIT_CATEGORY = gql`
    mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {
        updateCategory(updateCategoryInput: $updateCategoryInput) {
            id
            name
            parent_id
            children {
                id
                name
            }
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($id: Int!) {
        removeCategory(id: $id) {
            id
        }
    }
`;