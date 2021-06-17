import { gql } from "graphql-request";

export const fragments = gql`
  fragment ClientProperties on Client {
    email
    firstName
    id
    insertedAt
    lastName
    mobilePhone
    name
    updatedAt
  }
`;
