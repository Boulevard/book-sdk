import { PlatformClient } from "./platformClient";
import { Client } from "./client";

class Clients {
  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient) {}

  /**
   * Look up the authenticated client
   *
   * @async
   * @protected
   * @returns Promise containing the Client
   * @todo Implement
   */
  private async get(): Promise<Client> {
    return undefined;
  }
}

export { Clients };
