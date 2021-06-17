import { gql } from "graphql-request";
export const fragments = gql`
  fragment StaffProperties on Staff {
    bio
    firstName
    id
    insertedAt
    lastName
    nickName
    role {
      id
      name
    }
    updatedAt
  }
`;
