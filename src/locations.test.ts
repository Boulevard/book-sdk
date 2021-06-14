import { v4 as uuidv4 } from "uuid";
import { Blvd } from "./blvd";
import fetch from "cross-fetch";

jest.mock("cross-fetch", () => ({
  __esModule: true,
  ...jest.requireActual("cross-fetch"),
  default: jest.fn(() =>
    Promise.resolve({
      ok: true,
      headers: { get: () => "application/json" },
      json: () =>
        Promise.resolve({ data: { locations: { edges: [{ node: {} }] } } })
    })
  )
}));

jest.mock("cross-fetch");

describe("testing api", () => {
  test("fetches sandbox locations", () => {
    const businessID = uuidv4();
    const apiKey = uuidv4();
    const client = new Blvd(apiKey, businessID);

    client.locations.list();

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.stringContaining("locations(first: 100)")
      })
    );
  });
});
