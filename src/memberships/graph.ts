import { gql } from "graphql-request";
import { fragments as clientFragments } from "../clients/graph";
import { fragments as serviceFragments } from "../services/graph";

export const myMembershipsQuery = gql`
  ${clientFragments}
  ${serviceFragments}
  query MyMemberships {
    locations(first: 100) {
      edges {
        node {
          client {
            ...ClientProperties
          }
          endOn
          id
          interval
          name
          startOn
          status
          termNumber
          vouchers {
            quantity
            service {
              ...ServiceProperties
            }
            services {
              ...ServiceProperties
            }
          }
        }
      }
    }
  }
`;
