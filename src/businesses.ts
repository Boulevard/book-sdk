import { Node, PlatformClient } from "./platformClient";
import { Maybe, Scalars } from "./graph";
import * as Graph from "./graph";
import { businessLocationsQuery, businessQuery } from "./businesses/graph";
import { Location } from "./locations";

class Business extends Node<Graph.Business> {
  avatar: Maybe<Scalars["String"]>;

  /** The ID of an object */
  id: Scalars["ID"];

  insertedAt: Scalars["DateTime"];

  /** Name of the business */
  name: Scalars["String"];

  // TODO: Required?
  // onlineGiftCardSettings: OnlineGiftCardSettings;

  /** The timezone associated with the business */
  tz: Scalars["Tz"];

  updatedAt: Scalars["DateTime"];

  /** The business' website. This could be an empty string. */
  website: Scalars["String"];

  /**
   * Get all locations for this business.
   *
   * Reads every page of the connection rather than the first one only. The
   * query previously took a fixed `first: 100`, which silently truncated
   * larger businesses and disagreed with `locations.list()`, where the same
   * data was capped at 200.
   *
   * @async
   * @public
   * @param pageSize Locations to request per page. Defaults to 100.
   */
  async getLocations(pageSize: number = 100): Promise<Array<Location>> {
    const locations: Array<Location> = [];
    let after: string | null = null;

    for (;;) {
      const response = await this.platformClient.request(
        businessLocationsQuery,
        { first: pageSize, after }
      );

      const connection = response.business.locations;

      locations.push(
        ...connection.edges.map(
          ({ node }: Graph.LocationEdge) =>
            new Location(this.platformClient, node)
        )
      );

      // A server that omits pageInfo yields a single page rather than looping
      // forever.
      const pageInfo = connection.pageInfo;
      if (!pageInfo?.hasNextPage || !pageInfo.endCursor) {
        return locations;
      }

      after = pageInfo.endCursor;
    }
  }
}

class Businesses {
  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient) {}

  /**
   * Look up the currently authenticated business
   *
   * @async
   * @public
   * @returns Promise containing the Business
   */
  async get(): Promise<Business> {
    const response = await this.platformClient.request(businessQuery);

    return new Business(this.platformClient, response.business);
  }
}

export { Businesses, Business };
