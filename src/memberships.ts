import { PlatformClient } from "./platformClient";
import { Membership } from "./graph";

class Memberships {
  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient) {}

  /**
   * List memberships for the authenticated client
   *
   * @async
   * @protected
   * @returns Promise containing the list of Memberships
   * @todo Implement (pagination?)
   */
  private async all(): Promise<Array<Membership>> {
    return undefined;
  }
}

export { Memberships };
