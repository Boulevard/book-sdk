import { Locations } from "../src/locations";
import { PlatformClient } from "../src/platformClient";

/**
 * Location connections are paginated. These tests drive the SDK against a
 * stub client that hands back two pages, so a regression to "read the first
 * page only" fails here rather than silently shortening a multi-location
 * business's catalog in production.
 */

const locationNode = (id: string) => ({
  id,
  name: `Location ${id}`,
  address: {
    city: null,
    line1: null,
    line2: null,
    state: null,
    province: null,
    zip: null,
    country: null
  }
});

/** Minimal stand-in for PlatformClient that serves canned pages. */
const stubClient = (pages: Array<any>) => {
  const calls: Array<any> = [];
  let index = 0;

  const client = {
    calls,
    request: jest.fn(async (_query: any, variables?: any) => {
      calls.push(variables);
      const page = pages[index];
      index += 1;
      return page;
    })
  };

  return client as unknown as PlatformClient & { calls: Array<any> };
};

const page = (ids: Array<string>, hasNextPage: boolean, endCursor?: string) => ({
  locations: {
    edges: ids.map(id => ({ node: locationNode(id) })),
    pageInfo: { hasNextPage, endCursor: endCursor ?? null }
  }
});

describe("locations.list pagination", () => {
  it("returns every location across multiple pages", async () => {
    const client = stubClient([
      page(["1", "2"], true, "cursor-1"),
      page(["3"], false)
    ]);

    const locations = await new Locations(client).list();

    expect(locations.map(l => l.id)).toEqual(["1", "2", "3"]);
  });

  it("passes the previous page's endCursor as `after`", async () => {
    const client = stubClient([
      page(["1"], true, "cursor-1"),
      page(["2"], false)
    ]);

    await new Locations(client).list();

    expect(client.calls[0]).toEqual({ first: 200, after: null });
    expect(client.calls[1]).toEqual({ first: 200, after: "cursor-1" });
  });

  it("stops after one request when there is no next page", async () => {
    const client = stubClient([page(["1"], false)]);

    await new Locations(client).list();

    expect(client.request).toHaveBeenCalledTimes(1);
  });

  it("honours a caller-supplied page size", async () => {
    const client = stubClient([page(["1"], false)]);

    await new Locations(client).list(50);

    expect(client.calls[0]).toEqual({ first: 50, after: null });
  });

  it("does not loop forever when the server omits pageInfo", async () => {
    const client = stubClient([
      { locations: { edges: [{ node: locationNode("1") }] } }
    ]);

    const locations = await new Locations(client).list();

    expect(locations).toHaveLength(1);
    expect(client.request).toHaveBeenCalledTimes(1);
  });

  it("stops when hasNextPage is true but no cursor comes back", async () => {
    // Guards against an infinite loop if the server contradicts itself.
    const client = stubClient([page(["1"], true, undefined)]);

    const locations = await new Locations(client).list();

    expect(locations).toHaveLength(1);
    expect(client.request).toHaveBeenCalledTimes(1);
  });

  it("returns an empty array for a business with no locations", async () => {
    const client = stubClient([page([], false)]);

    await expect(new Locations(client).list()).resolves.toEqual([]);
  });
});
