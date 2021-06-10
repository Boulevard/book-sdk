import { PlatformClient } from "./platformClient";
import { Client as GraphClient, Scalars, UpdateClientInput } from "./graph";

class Client implements GraphClient {
  /** Email address */
  email?: Scalars["Email"];
  /** First name */
  firstName?: Scalars["String"];
  /** The ID of an object */
  id: Scalars["ID"];
  insertedAt: Scalars["DateTime"];
  /** Last name */
  lastName?: Scalars["String"];
  /** Mobile phone number */
  mobilePhone?: Scalars["PhoneNumber"];
  /** Full name */
  name?: Scalars["String"];
  updatedAt: Scalars["DateTime"];

  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient, client: GraphClient) {
    Object.assign(this, client);
  }

  /**
   * Update the authenticated client
   *
   * @async
   * @protected
   * @returns Promise containing the Client
   * @todo Implement
   */
  private async update(input: UpdateClientInput): Promise<Client> {
    return undefined;
  }
}

export { Client };
