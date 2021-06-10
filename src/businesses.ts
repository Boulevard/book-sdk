import { PlatformClient } from "./platformClient";
import { Business } from "./graph";

class Businesses {
  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient) {}

  /**
   * @async
   * @description Look up the currently authenticated business
   * @public
   * @returns {Promise} Promise containing the Business
   * @todo Implement
   */
  private async get(): Promise<Business> {
    return undefined;
  }
}

export { Businesses };
