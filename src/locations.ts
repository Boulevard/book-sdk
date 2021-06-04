import Client from "./client";
import { Location, LocationEdge } from "./graph";
import { getLocationsQuery } from "./locations/graph";

export default class Locations {
  constructor(private client: Client) {}

  async list(): Promise<Array<Location>> {
    const response = await this.client.request(getLocationsQuery);
    return response.locations.edges.map((edge: LocationEdge) => edge.node);
  }
}
