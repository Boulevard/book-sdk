/**
 * @jest-environment node
 */

import { Blvd } from "../src/blvd";

jest.mock("cross-fetch", mockFetch({}));

test("nodejs environment", async () => {
  const client = new Blvd("", "");
  await client.businesses.get();
});
