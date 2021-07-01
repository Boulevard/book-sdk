import { clientQuery, updateClientMutation } from "./clients/graph";
import { UpdateClientInput } from "./graph";
import { Maybe, Scalars } from "./graph";
import * as Graph from "./graph";
import { Authentication, Node, PlatformClient } from "./platformClient";
import { Cart } from "./cart";
import { takeOwnershipMutation } from "./carts/graph";
import { Membership } from "./memberships";
import { myMembershipsQuery } from "./memberships/graph";
import { Carts } from "./carts";

class Client extends Node<Graph.Client> {
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
  authentication?: Authentication;

  /**
   * Update the authenticated client
   *
   * @async
   * @returns Promise containing the Client
   */
  async update(input: UpdateClientInput): Promise<Client> {
    const response = await this.platformClient.request(updateClientMutation, {
      input
    });

    return new Client(this.platformClient, response.updateClient.client);
  }

  /**
   * Take ownership of a cart, linking the cart to this client's account.
   *
   * Using this mutation invalidates existing reservations.
   *
   * @async
   * @category Details
   * @returns Promise containing the updated cart
   */
  async takeCartOwnership(cart: Cart): Promise<Cart> {
    const input: Graph.TakeCartOwnershipInput = {
      id: cart.id
    };
    const response = await this.platformClient.request(takeOwnershipMutation, {
      input
    });

    // TODO: When requesting the full ...CartProperties on this mutation, we get
    // a 500 back from sandbox. Unable to reproduce in tests on sched for now
    return await new Carts(this.platformClient).get(
      response.takeCartOwnership.cart.id
    );
  }

  /**
   * List memberships for this client
   *
   * @async
   * @returns Promise containing the list of Memberships
   */
  async listMemberships(): Promise<Array<Membership>> {
    const response = await this.platformClient.request(myMembershipsQuery);
    return response.myMemberships.edges.map(
      (edge: Graph.MembershipEdge) =>
        new Membership(this.platformClient, edge.node)
    );
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
   * @returns Promise containing the Client
   */
  async get(auth: Authentication): Promise<Client> {
    const platformClient = this.platformClient.withAuthentication(auth);
    const response = await platformClient.request(clientQuery);
    return new Client(platformClient, response.client);
  }
}

export { Authentication, Clients, Client, Membership, UpdateClientInput };
