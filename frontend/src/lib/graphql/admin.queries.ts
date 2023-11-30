import { gql } from "@apollo/client";

export const ADMIN_GET_ALL = gql`
  {
    adminGetAll {
      email
      name
      avatar
      role
      type
    }
  }
`;
