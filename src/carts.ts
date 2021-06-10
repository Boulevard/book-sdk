import { gql } from "graphql-request";
import { createCartMutation } from "./carts/graph";
import { PlatformClient } from "./platformClient";
import { Location, Scalars } from "./graph";
import { Cart } from "./cart";

class Carts {
  /**
   * @internal
   * @param client
   */
  constructor(private platformClient: PlatformClient) {}

  async create(location: Location): Promise<Cart> {
    const response = await this.platformClient.request(createCartMutation, {
      locationId: location.id
    });

    return new Cart(this.platformClient, response.createCart.cart);
  }

  /**
   * @async
   * Retrieves a cart by ID
   *
   * @param {id} ID the ID of the cart
   * @protected
   * @todo Implement
   */
  private async get(id: Scalars["ID"]): Promise<Cart> {
    return undefined;
  }
}

export { Carts };
