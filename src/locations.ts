import { PlatformClient } from "./platformClient";
import {
  Address,
  Location as GraphLocation,
  LocationEdge,
  Maybe,
  Scalars
} from "./graph";
import { getLocationsQuery } from "./locations/graph";

class Location {
  /** The location's address */
  address: Address;

  /** The location's logo */
  avatar: Maybe<Scalars["String"]>;

  /** Name of the business */
  businessName: Scalars["String"];

  /** The ID of an object */
  id: Scalars["ID"];

  insertedAt: Scalars["DateTime"];

  /** The location's name */
  name: Scalars["String"];

  /** The location's name */
  phoneNumber: Maybe<Scalars["String"]>;

  /** The location's timezone */
  tz: Scalars["Tz"];

  updatedAt: Scalars["DateTime"];

  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient, location: GraphLocation) {
    Object.assign(this, location);
  }
}

class Locations {
  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient) {}

  /**
   * List locations for the business
   *
   * @async
   * @returns Promise containing a list of Locations
   * @todo Pagination
   */
  async list(): Promise<Array<Location>> {
    const response = await this.platformClient.request(getLocationsQuery);
    return response.locations.edges.map(
      (edge: LocationEdge) => new Location(this.platformClient, edge.node)
    );
  }
}

export { Locations, Location };
