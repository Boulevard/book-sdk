import { GraphQLClient } from "graphql-request";
import { RequestDocument, Variables } from "graphql-request/dist/types";
import { getSdk, Sdk } from "./graph";
import { inspect } from "util";
// import { version } from './../package.json';

const version = "1.0.21";

const btoa = string => {
  const buffer = Buffer.from(string.toString(), "binary");
  return buffer.toString("base64");
};

export enum PlatformTarget {
  Sandbox,
  Live
}

interface SdkInterface extends Sdk {}

/**
 * Use an Authentication scheme to perform operations on behalf of a client.
 * see {@link https://developers.joinblvd.com/2020-01/client-api/authentication} for details
 * of how to generate a signed client token
 */
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
  private url: string;

  constructor(
    private apiKey: string,
    businessID: string,
    public target?: PlatformTarget
  ) {
    this.url = this.buildUrl(businessID, target);
    this.client = this.buildClient();
  }

  private buildUrl(businessID: String, target?: PlatformTarget) {
    switch (target) {
      case PlatformTarget.Sandbox:
        return `https://sandbox.joinblvd.com/api/2020-01/${businessID}/client`;
      case PlatformTarget.Live:
        return `https://dashboard.boulevard.io/api/2020-01/${businessID}/client`;
      case undefined:
        return `https://sandbox.joinblvd.com/api/2020-01/${businessID}/client`;
      default:
        return `${target}/api/2020-01/${businessID}/client`;
    }
  }

  request(query: RequestDocument, variables?: Variables) {
    const result = this.client.request(query, variables, this.headers());
    return result;
  }

  withAuthentication(auth: Authentication): PlatformClient {
    this.authentication = auth;
    return this;
  }

  sdk(): SdkInterface {
    return getSdk(this.buildClient());
  }

  authenticatedSdk(auth: Authentication): SdkInterface {
    return this.withAuthentication(auth).sdk();
  }

  private buildClient(): GraphQLClient {
    return new GraphQLClient(this.url, { headers: this.headers() });
  }

  private token() {
    return this.authentication?.token
      ? btoa(`${this.apiKey}:${this.authentication.token}`)
      : btoa(`${this.apiKey}:`);
  }

  private headers(): Record<"Authorization" | "Book-SDK-Version", string> {
    return {
      Authorization: `Basic ${this.token()}`,
      "Book-SDK-Version": version
    };
  }
}

export { PlatformClient, Node };
