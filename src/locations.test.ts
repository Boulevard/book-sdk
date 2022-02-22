import { v4 as uuidv4 } from "uuid";
import { Blvd } from "./blvd";
import fetch from "cross-fetch";

jest.mock("cross-fetch", mockFetch({ locations: { edges: [{ node: {} }] } }));

describe("testing api", () => {
  test("fetches sandbox locations", () => {
    const businessID = uuidv4();
    const apiKey = uuidv4();
    const client = new Blvd(apiKey, businessID);

    client.locations.list();

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.stringContaining("locations(first: 200)")
      })
    );
  });
});
