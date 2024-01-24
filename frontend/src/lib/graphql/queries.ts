import { gql } from "@apollo/client";

export const GET_NEW_TOKENS = gql`
  query getNewTokens($refreshToken: String!) {
    authNewTokens(refresh_token: $refreshToken) {
      user {
        id
        name
        email
        role
      }
      refreshToken
      accessToken
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation productCreate($createProductInput: CreateProductInput!) {
    productCreate(createProductInput: $createProductInput) {
      name
      price
      slug
      stock
      descriptions {
        id
        head
        body
      }
      images {
        name
        url
      }
      category {
        id
        name
        slug
      }
      subcategory {
        id
        name
        slug
      }
    }
  }
`;

export const USER_LOGIN = gql`
  query authLogin($loginUserInput: LoginUserInput!) {
    authLogin(loginInput: $loginUserInput) {
      user {
        id
        name
        email
        role
      }
      refreshToken
      accessToken
    }
  }
`;

export const ADMIN_LOGIN = gql`
  query authAdminLogin($loginAdminInput: LoginAdminInput!) {
    authAdminLogin(loginAdminInput: $loginAdminInput) {
      user {
        id
        name
        email
        role
      }
      refreshToken
      accessToken
    }
  }
`;

export const USER_REGISTER = gql`
  mutation userCreate($createUserInput: CreateUserInput!) {
    userCreate(createUserInput: $createUserInput) {
      message
    }
  }
`;

export const GET_CURRENT_ADMIN_AVATAR = gql`
  query {
    adminGetAvatar {
      avatar
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($skip: Float!, $take: Float!) {
    productGetMany(skip: $skip, take: $take) {
      id
      name
      price
      slug
      stock
      descriptions {
        id
        head
        body
      }
      images {
        name
        url
      }
      category {
        id
        name
        slug
      }
      subcategory {
        id
        name
        slug
      }
    }
  }
`;

export const GET_PRODUCTS_COUNT = gql`
  query {
    productCount
  }
`;
