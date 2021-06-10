import { PlatformClient } from "./platformClient";
import { Client } from "./graph";

class Clients {
  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient) {}

  /**
   * @async
   * @description Look up the authenticated client
   * @protected
   * @returns {Promise} Promise containing the Client
   * @todo Implement
   */
  private async get(): Promise<Client> {
    return undefined;
  }
}

export { Clients };
