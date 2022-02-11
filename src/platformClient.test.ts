import fetch from "cross-fetch";
import { PlatformClient, PlatformTarget } from "./platformClient";

jest.mock("cross-fetch", mockFetch({}));

describe("testing api", () => {
  test("fetches sandbox locations", () => {
    const businessID = "0bfcf11-4eed-4118-bbbc-8d7f7a1c5d8a";
    const apiKey = "197f3eac-f90d-42b3-80ed-e3a68288647b";
    const client = new PlatformClient(apiKey, businessID);
    client.request("");

    expect(fetch).toHaveBeenCalledWith(
      "https://sandbox.joinblvd.com/api/2020-01/0bfcf11-4eed-4118-bbbc-8d7f7a1c5d8a/client",
      {
        body: '{"query":""}',
        headers: {
          "Book-SDK-Version": "1.0.21",
          Authorization:
            "Basic MTk3ZjNlYWMtZjkwZC00MmIzLTgwZWQtZTNhNjgyODg2NDdiOg==",
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    );
  });

  test("fetches live locations", () => {
    const businessID = "81e9fda3-98d2-4b91-86af-406e1db8d30b";
    const apiKey = "a7227ad0-9042-4e8d-9349-332ab6544027";
    const client = new PlatformClient(apiKey, businessID, PlatformTarget.Live);

    client.request("");

    expect(fetch).toHaveBeenCalledWith(
      "https://dashboard.boulevard.io/api/2020-01/81e9fda3-98d2-4b91-86af-406e1db8d30b/client",
      {
        body: '{"query":""}',
        headers: {
          Authorization:
            "Basic YTcyMjdhZDAtOTA0Mi00ZThkLTkzNDktMzMyYWI2NTQ0MDI3Og==",
          "Content-Type": "application/json",
          "Book-SDK-Version": "1.0.21"
        },
        method: "POST"
      }
    );
  });

  test("fetches local locations", () => {
    const businessID = "aa548528-7bc7-47c3-a063-37c950a6e5c2";
    const apiKey = "265e5365-b742-409f-98ef-d890b3efde70";
    const client = new PlatformClient(
      apiKey,
      businessID,
      // @ts-expect-error Testing undocumented feature for internal development
      "http://localhost:4000"
    );

    client.request("");

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/api/2020-01/aa548528-7bc7-47c3-a063-37c950a6e5c2/client",
      {
        body: '{"query":""}',
        headers: {
          "Book-SDK-Version": "1.0.21",
          Authorization:
            "Basic MjY1ZTUzNjUtYjc0Mi00MDlmLTk4ZWYtZDg5MGIzZWZkZTcwOg==",
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    );
  });
});
