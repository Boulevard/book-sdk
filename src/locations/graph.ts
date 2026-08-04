import { gql } from "graphql-request";

export const fragments = gql`
  fragment LocationProperties on Location {
    address {
      city
      line1
      line2
      state
      province
      zip
      country
    }
    arrivalInstructions
    avatar
    businessName
    id
    externalId
    insertedAt
    name
    phoneNumber
    coordinates
    tz
    isRemote
    updatedAt
  }
`;

export const getLocationsQuery = gql`
  ${fragments}
  query GetLocations($first: Int, $after: String) {
    locations(first: $first, after: $after) {
      edges {
        node {
          ...LocationProperties
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
