import { PlatformClient } from "./platformClient";
import { Business } from "./graph";

class Businesses {
  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient) {}

  /**
   * Look up the currently authenticated business
   *
   * @async
   * @public
   * @returns Promise containing the Business
   * @todo Implement
   */
  private async get(): Promise<Business> {
    return undefined;
  }
}

export { Businesses };
