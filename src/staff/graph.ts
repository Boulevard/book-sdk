import { gql } from "graphql-request";
export const fragments = gql`
  fragment StaffProperties on Staff {
    avatar
    bio
    firstName
    id
    insertedAt
    lastName
    displayName
    nickname
    role {
      id
      name
    }
    updatedAt
  }
`;
