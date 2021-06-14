import { Appointment, Appointments } from "./appointments";
import { Businesses } from "./businesses";
import { Cart } from "./cart";
import { Carts } from "./carts";
import { PlatformClient, PlatformTarget } from "./platformClient";
import { Clients } from "./clients";
import { Locations } from "./locations";
import { Memberships } from "./memberships";
import { Client } from "./client";

class Blvd {
  appointments: Appointments;
  businesses: Businesses;
  carts: Carts;
  clients: Clients;
  locations: Locations;
  memberships: Memberships;
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
    this.memberships = new Memberships(client);
  }
}

export {
  Blvd,
  Appointment,
  Appointments,
  Businesses,
  Cart,
  Carts,
  Client,
  Clients,
  Locations,
  Memberships,
  PlatformTarget
};
