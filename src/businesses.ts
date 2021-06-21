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
   * Get all locations for this business
   *
   * @async
   * @public
   * @todo Pagination
   */
  async getLocations(): Promise<Array<Location>> {
    const response = await this.platformClient.request(businessLocationsQuery);

    return response.business.locations.edges.map(
      ({ node }: Graph.LocationEdge) => new Location(this.platformClient, node)
    );
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
