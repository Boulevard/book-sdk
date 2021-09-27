import { Node, PlatformClient } from "./platformClient";
import { Maybe, Scalars } from "./graph";
import * as Graph from "./graph";
import { getLocationsQuery } from "./locations/graph";

class Address extends Node<Graph.Address> {
  city: Maybe<Scalars["String"]>;
  line1: Maybe<Scalars["String"]>;
  line2: Maybe<Scalars["String"]>;
  state: Maybe<Scalars["String"]>;
  province: Maybe<Scalars["String"]>;
  zip: Maybe<Scalars["String"]>;
  country: Maybe<Scalars["String"]>;
}

class Location extends Node<Graph.Location> {
  /** The location's address */
  address: Graph.Address;

  /** The location's logo */
  avatar: Maybe<Scalars["String"]>;

  /** Name of the business */
  businessName: Scalars["String"];

  /** The ID of an object */
  id: Scalars["ID"];

  /** Location external id */
  externalId: Maybe<Scalars["String"]>;

  insertedAt: Scalars["DateTime"];

  /** The location's name */
  name: Scalars["String"];

  /** The location's name */
  phoneNumber: Maybe<Scalars["String"]>;

  /** The location's timezone */
  tz: Scalars["Tz"];

  /**
   * Indicates that the location is a remote location, and that appointments for
   * this location are carried out remotely.
   */
  isRemote: Scalars["Boolean"];

  coordinates: Maybe<{
    latitude: Scalars["Float"];
    longitude: Scalars["Float"];
  }>;

  updatedAt: Scalars["DateTime"];

  /**
   * @internal
   */
  constructor(platformClient: PlatformClient, location: Graph.Location) {
    super(platformClient, location);
    this.address = new Address(platformClient, location.address);
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
      (edge: Graph.LocationEdge) => new Location(this.platformClient, edge.node)
    );
  }
}

export { Locations, Location };
