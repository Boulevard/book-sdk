import { gql } from "graphql-request";
import { fragments as locationsFragments } from "../locations/graph";

export const fragments = gql`
  fragment BusinessProperties on Business {
    avatar
    id
    insertedAt
    name
    tz
    updatedAt
    website
  }
`;

export const businessQuery = gql`
  ${fragments}
  query Business {
    business {
      ...BusinessProperties
    }
  }
`;

export const businessLocationsQuery = gql`
  ${locationsFragments}
  query Business($first: Int, $after: String) {
    business {
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
  }
`;
