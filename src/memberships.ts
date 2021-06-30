import { Node, PlatformClient } from "./platformClient";
import { Maybe, Scalars } from "./graph";

import * as Graph from "./graph";
import { Client } from "./clients";
import { Service } from "./services";
import { myMembershipsQuery } from "./memberships/graph";

/** A membership service voucher */
class MembershipVoucher extends Node<Graph.MembershipVoucher> {
  /** Number of vouchers included */
  quantity: Scalars["Int"];

  service: Service;

  services: Array<Service>;

  /**
   * @internal
   */
  constructor(
    platformClient: PlatformClient,
    voucher: Graph.MembershipVoucher
  ) {
    super(platformClient, voucher);
    this.service = new Service(platformClient, voucher.service);
    this.services = voucher.services.map(s => new Service(platformClient, s));
  }
}

/** A client membership sold at the business. */

class Membership extends Node<Graph.Membership> {
  /** Client who owns the membership. */
  client: Client;

  /** The id of the client who owns the membership. */
  clientId: Scalars["ID"];

  /**
   * Ending date for the membership.
   *
   * May be NULL to indicate an indefinitely frozen membership.
   */
  endOn: Maybe<Scalars["Date"]>;

  /** The ID of an object */
  id: Scalars["ID"];

  /** Duration of the membership interval (eg. 1 month). */
  interval: Scalars["DurationInterval"];

  /** The membership name. */
  name: Scalars["String"];

  /** Start date of the membership. */
  startOn: Scalars["Date"];

  /** Membership Status. Active, Cancelled, Past Due or Paused */
  status: Graph.SubscriptionStatus;

  /** The current term number of the membership */
  termNumber: Scalars["Int"];

  /** Optional vouchers included with membership */
  vouchers: Array<MembershipVoucher>;

  /**
   * @internal
   */
  constructor(platformClient: PlatformClient, membership: Graph.Membership) {
    super(platformClient, membership);
    this.client = new Client(platformClient, membership.client);
    this.vouchers = membership.vouchers.map(
      v => new MembershipVoucher(platformClient, v)
    );
  }
}

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
   */
  async list(): Promise<Array<Membership>> {
    const response = await this.platformClient.request(myMembershipsQuery);
    return response.locations.edges.map(
      (edge: Graph.MembershipEdge) =>
        new Membership(this.platformClient, edge.node)
    );
  }
}

export { Memberships };
