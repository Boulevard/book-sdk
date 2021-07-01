import { Appointments } from "./appointments";
import { Businesses } from "./businesses";
import { Carts } from "./carts";
import { PlatformClient, PlatformTarget } from "./platformClient";
import { Clients } from "./clients";
import { Locations } from "./locations";
import { Maybe, Scalars } from "./graph";

class Blvd {
  appointments: Appointments;
  businesses: Businesses;
  carts: Carts;
  clients: Clients;
  locations: Locations;
  /**
   * Creates a new instance of the Boulevard client.
   *
   * You can create a Sandbox account and generate credentials at https://developers.joinblvd.com/
   *
   * @param apiKey The API Key of your application
   * @param businessID The ID of the business
   * @param target The backend target for this client. Defaults to {@link PlatformTarget.Sandbox}
   * @public
   * @returns A new Boulevard client instance
   */
  constructor(apiKey: string, businessID: string, target?: PlatformTarget) {
    const client = new PlatformClient(apiKey, businessID, target);
    this.appointments = new Appointments(client);
    this.businesses = new Businesses(client);
    this.carts = new Carts(client);
    this.clients = new Clients(client);
    this.locations = new Locations(client);
  }
}

export { Blvd, PlatformTarget, Maybe, Scalars };
