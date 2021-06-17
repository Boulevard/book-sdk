import { clientQuery, updateClientMutation } from "./clients/graph";
import {
  Maybe,
  Scalars,
  UpdateClientInput,
  Client as GraphClient
} from "./graph";
import { PlatformClient } from "./platformClient";

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
   */
  async update(input: UpdateClientInput): Promise<Client> {
    const response = await this.platformClient.request(updateClientMutation, {
      input
    });

    return new Client(this.platformClient, response.updateClient.client);
  }
}

class Clients {
  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient) {}

  /**
   * Look up the authenticated client
   *
   * @async
   * @protected
   * @returns Promise containing the Client
   */
  async get(): Promise<Client> {
    const response = await this.platformClient.request(clientQuery);
    return new Client(this.platformClient, response.client);
  }
}

export { Clients, Client, UpdateClientInput };
