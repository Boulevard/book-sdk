import { Appointments } from "./appointments";
import { Businesses } from "./businesses";
import { Cart, Carts } from "./carts";
import { Client } from "./client";
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
    const client = new Client(apiKey, businessID);
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
  Appointments,
  Businesses,
  Cart,
  Carts,
  Clients,
  Locations,
  Memberships
};
