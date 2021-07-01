import { GraphQLClient } from "graphql-request";
import { RequestDocument, Variables } from "graphql-request/dist/types";

export enum PlatformTarget {
  Sandbox,
  Live
}

export type Authentication = {
  token: string;
};

class Node<T> {
  /**
   * @internal
   */
  protected platformClient: PlatformClient;

  /**
   * @internal
   */
  constructor(platformClient: PlatformClient, graphItem: T) {
    this.platformClient = platformClient;
    Object.assign(this, graphItem);
  }
}

class PlatformClient {
  private authentication?: Authentication;
  private client: GraphQLClient;
  constructor(
    private apiKey: string,
    businessID: string,
    public target?: PlatformTarget
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

  withAuthentication(auth: Authentication): PlatformClient {
    this.authentication = auth;
    return this;
  }

  private token() {
    return this.authentication?.token
      ? btoa(`${this.apiKey}:${this.authentication.token}`)
      : btoa(`${this.apiKey}:`);
  }

  private headers(): Record<"Authorization", string> {
    return { Authorization: `Basic ${this.token()}` };
  }
}

export { PlatformClient, Node };
