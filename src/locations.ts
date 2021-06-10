import { PlatformClient } from "./platformClient";
import { Location, LocationEdge } from "./graph";
import { getLocationsQuery } from "./locations/graph";

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
    return response.locations.edges.map((edge: LocationEdge) => edge.node);
  }
}

export { Locations };
