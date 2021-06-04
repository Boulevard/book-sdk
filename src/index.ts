import Carts from "./carts";
import Client from "./client";
import Locations from "./locations";

export default class Blvd {
  carts: Carts;
  locations: Locations;
  constructor(apiKey: string, businessID: string) {
    // TODO: Do we want to expose the client, or at least
    // some way of calling arbitrary GQL requests?
    const client = new Client(apiKey, businessID);
    this.carts = new Carts(client);
    this.locations = new Locations(client);
  }
}
