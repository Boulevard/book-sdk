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
    allowOnlineBooking
    allowOnlineRescheduling
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
  query GetLocations {
    locations(first: 200) {
      edges {
        node {
          ...LocationProperties
        }
      }
    }
  }
`;
