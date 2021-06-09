import Client from "./client";
import { Business } from "./graph";

export default class Businesses {
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
