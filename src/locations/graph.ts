import { gql } from "graphql-request";

export const fragments = gql`
  fragment LocationProperties on Location {
    address {
      city
      line1
      line2
      state
      zip
    }
    avatar
    businessName
    id
    insertedAt
    name
    phoneNumber
    tz
    updatedAt
  }
`;

export const getLocationsQuery = gql`
  ${fragments}
  query GetLocations {
    locations(first: 100) {
      edges {
        node {
          ...LocationProperties
        }
      }
    }
  }
`;
