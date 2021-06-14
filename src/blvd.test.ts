import { Appointments } from "./appointments";
import { Blvd } from "./blvd";
import { Businesses } from "./businesses";
import { Carts } from "./carts";
import { Clients } from "./clients";
import { Locations } from "./locations";
import { Memberships } from "./memberships";

test("interface to Blvd", () => {
  const client = new Blvd("", "");
  expect(client.appointments).toBeInstanceOf(Appointments);
  expect(client.businesses).toBeInstanceOf(Businesses);
  expect(client.carts).toBeInstanceOf(Carts);
  expect(client.clients).toBeInstanceOf(Clients);
  expect(client.locations).toBeInstanceOf(Locations);
  expect(client.memberships).toBeInstanceOf(Memberships);
});
