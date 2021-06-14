import { v4 as uuidv4 } from "uuid";
import { Blvd } from "./blvd";
import fetch from "cross-fetch";
import { PlatformTarget } from "./platformClient";

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
      `https://sandbox.joinblvd.com/api/2020-01/${businessID}/client`,
      expect.objectContaining({
        body: expect.stringContaining("locations(first: 100)")
      })
    );
  });

  test("fetches live locations", () => {
    const businessID = uuidv4();
    const apiKey = uuidv4();
    const client = new Blvd(apiKey, businessID, PlatformTarget.Live);

    client.locations.list();

    expect(fetch).toHaveBeenCalledWith(
      `https://dashboard.boulevard.io/api/2020-01/${businessID}/client`,
      expect.objectContaining({
        body: expect.stringContaining("locations(first: 100)")
      })
    );
  });

  test("fetches local locations", () => {
    const businessID = uuidv4();
    const apiKey = uuidv4();
    const client = new Blvd(
      apiKey,
      businessID,
      // @ts-expect-error Testing undocumented feature for internal development
      "http://localhost:4000"
    );

    client.locations.list();

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:4000/api/2020-01/${businessID}/client`,
      expect.objectContaining({
        body: expect.stringContaining("locations(first: 100)")
      })
    );
  });
});
