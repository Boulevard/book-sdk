import { GraphQLClient } from "graphql-request";
import { RequestDocument, Variables } from "graphql-request/dist/types";

class PlatformClient {
  private client: GraphQLClient;
  constructor(businessID: string, private apiKey: string) {
    this.client = new GraphQLClient(
      // TODO: Make enviornment-specific
      `http://localhost:4000/api/2020-01/${businessID}/client`
    );
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

export { PlatformClient };
