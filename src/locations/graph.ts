import { gql } from "graphql-request";

export const getLocationsQuery = gql`
  query GetLocations {
    locations(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
