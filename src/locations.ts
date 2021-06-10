import { PlatformClient } from "./platformClient";
import { Location, LocationEdge } from "./graph";
import { getLocationsQuery } from "./locations/graph";

class Locations {
  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient) {}

  async list(): Promise<Array<Location>> {
    const response = await this.platformClient.request(getLocationsQuery);
    return response.locations.edges.map((edge: LocationEdge) => edge.node);
  }
}

export { Locations };
