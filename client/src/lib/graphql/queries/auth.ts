import { gql } from "@apollo/client";

const AUTH_USER_FRAGMENT = gql`
    fragment AuthUserFragment on AuthUser {
        id
        first_name
        last_name
        email
    }`;

export const AUTH_ADMIN_LOGIN = gql`
    query authAdminLogin($loginInput: LoginInput!) {
        authAdminLogin(loginInput: $loginInput) {
            user {
                ...AuthUserFragment
                role
            }
            refreshToken
            accessToken
        }
    }
    ${AUTH_USER_FRAGMENT}
`;

export const AUTH_USER_LOGIN = gql`
    query authUserLogin($loginInput: LoginInput!) {
        authUserLogin(loginInput: $loginInput) {
            user {
                ...AuthUserFragment
            }
            refreshToken
            accessToken
        }
    }
    ${AUTH_USER_FRAGMENT}
`;

export const AUTH_USER_TOKENS = gql`
    query authUserNewTokens($refresh_token: String!) {
        authUserNewTokens(refresh_token: $refresh_token) {
            user {
                id
                first_name
                last_name
                email
            }
            refreshToken
            accessToken
        }
    }
`;

export const AUTH_ADMIN_TOKENS = gql`
    query authAdminNewTokens($refresh_token: String!) {
        authAdminNewTokens(refresh_token: $refresh_token) {
            user {
                id
                first_name
                last_name
                email
                role
            }
            refreshToken
            accessToken
        }
    }
`;