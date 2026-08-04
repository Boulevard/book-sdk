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

  /** Whether or not the location allows booking online */
  allowOnlineBooking: Scalars["Boolean"];

  /** Whether or not the location allows rescheduling online */
  allowOnlineRescheduling: Scalars["Boolean"];

  /** The location's arrival instructions */
  arrivalInstructions: Scalars["String"];

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

  social: Graph.LocationSocialAccounts;

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
   * List locations for the business.
   *
   * Follows the connection's `pageInfo` until every page has been read, so a
   * business with more locations than a single page holds still gets all of
   * them. Previously the query took a fixed `first: 200` and ignored
   * `pageInfo`, so anything past that was dropped with no indication.
   *
   * @async
   * @param pageSize Locations to request per page. Defaults to 200.
   * @returns Promise containing a list of Locations
   */
  async list(pageSize: number = 200): Promise<Array<Location>> {
    const locations: Array<Location> = [];
    let after: string | null = null;

    for (;;) {
      const response = await this.platformClient.request(getLocationsQuery, {
        first: pageSize,
        after
      });

      const connection = response.locations;

      locations.push(
        ...connection.edges.map(
          (edge: Graph.LocationEdge) =>
            new Location(this.platformClient, edge.node)
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

export { Locations, Location };
