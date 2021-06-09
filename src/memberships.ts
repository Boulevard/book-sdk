import { Client } from "./client";
import { Membership } from "./graph";

class Memberships {
  /**
   * @internal
   */
  constructor(private client: Client) {}

  /**
   * @async
   * @description List memberships for the authenticated client
   * @protected
   * @returns {Promise} Promise containing the list of Memberships
   * @todo Implement (pagination?)
   */
  private async all(): Promise<Array<Membership>> {
    return undefined;
  }
}

export { Memberships };
