import { PlatformClient } from "./platformClient";
import {
  Client as GraphClient,
  Maybe,
  Scalars,
  UpdateClientInput
} from "./graph";

class Client {
  /** Email address */
  email: Maybe<Scalars["Email"]>;

  /** First name */
  firstName: Maybe<Scalars["String"]>;

  /** The ID of an object */
  id: Scalars["ID"];

  insertedAt: Scalars["DateTime"];

  /** Last name */
  lastName: Maybe<Scalars["String"]>;

  /** Mobile phone number */
  mobilePhone: Maybe<Scalars["PhoneNumber"]>;

  /** Full name */
  name: Maybe<Scalars["String"]>;

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
