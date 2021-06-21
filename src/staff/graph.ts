import { gql } from "graphql-request";
export const fragments = gql`
  fragment StaffProperties on Staff {
    bio
    firstName
    id
    insertedAt
    lastName
    nickname
    role {
      id
      name
    }
    updatedAt
  }
`;
