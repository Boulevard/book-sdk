import { Client } from "./client";
import { Business } from "./graph";

class Businesses {
  /**
   * @internal
   * @param client
   */
  constructor(private client: Client) {}

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
