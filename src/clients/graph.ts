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

export const clientQuery = gql`
  ${fragments}
  query Client {
    client {
      ...ClientProperties
    }
  }
`;

export const updateClientMutation = gql`
  ${fragments}
  mutation UpdateClient($input: UpdateClientInput!) {
    updateClient(input: $input) {
      client {
        ...ClientProperties
      }
    }
  }
`;
