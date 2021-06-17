import { GraphQLClient } from "graphql-request";
import { RequestDocument, Variables } from "graphql-request/dist/types";

export enum PlatformTarget {
  Sandbox,
  Live
}

class Node<T> {
  /**
   * @internal
   */
  protected platformClient: PlatformClient;

  /**
   * @internal
   */
  protected platformTarget: PlatformTarget = PlatformTarget.Sandbox;

  /**
   * @internal
   */
  constructor(
    platformClient: PlatformClient,
    graphItem: T,
    platformTarget: PlatformTarget = PlatformTarget.Sandbox
  ) {
    this.platformClient = platformClient;
    this.platformTarget = platformTarget;
    Object.assign(this, graphItem);
  }
}

class PlatformClient {
  private client: GraphQLClient;
  constructor(
    private apiKey: string,
    businessID: string,
    target?: PlatformTarget
  ) {
    switch (target) {
      case PlatformTarget.Sandbox:
        this.client = new GraphQLClient(
          `https://sandbox.joinblvd.com/api/2020-01/${businessID}/client`
        );
        break;
      case PlatformTarget.Live:
        this.client = new GraphQLClient(
          `https://dashboard.boulevard.io/api/2020-01/${businessID}/client`
        );
        break;
      case undefined:
        this.client = new GraphQLClient(
          `https://sandbox.joinblvd.com/api/2020-01/${businessID}/client`
        );
        break;
      default:
        this.client = new GraphQLClient(
          `${target}/api/2020-01/${businessID}/client`
        );
    }
  }

  request(query: RequestDocument, variables?: Variables) {
    return this.client.request(query, variables, this.headers());
  }

  private token() {
    return btoa(`${this.apiKey}:`);
  }

  private headers(): Record<"Authorization", string> {
    return { Authorization: `Basic ${this.token()}` };
  }
}

export { PlatformClient, Node };
