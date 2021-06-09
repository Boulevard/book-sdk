import GraphClient from "./client";
import { Client } from "./graph";

export default class Clients {
  constructor(private client: GraphClient) {}

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