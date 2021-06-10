import { Appointment, Appointments } from "./appointments";
import { Businesses } from "./businesses";
import { Cart } from "./cart";
import { Carts } from "./carts";
import { PlatformClient } from "./platformClient";
import { Clients } from "./clients";
import { Locations } from "./locations";
import { Memberships } from "./memberships";

class Blvd {
  appointments: Appointments;
  businesses: Businesses;
  carts: Carts;
  clients: Clients;
  locations: Locations;
  memberships: Memberships;
  constructor(apiKey: string, businessID: string) {
    const client = new PlatformClient(apiKey, businessID);
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
  Clients,
  Locations,
  Memberships
};
