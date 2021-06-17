import { gql } from "graphql-request";
export const fragments = gql`
  fragment ServiceProperties on Service {
    category {
      name
    }
    description
    id
    externalId
    name
  }
`;
