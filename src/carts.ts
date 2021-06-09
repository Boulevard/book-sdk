import { gql } from "graphql-request";
import { createCartMutation } from "./carts/graph";
import { Client } from "./client";
import { Location, Scalars } from "./graph";
import { Cart } from "./cart";

class Carts {
  /**
   * @internal
   * @param client
   */
  constructor(private client: Client) {}

  async create(location: Location): Promise<Cart> {
    const response = await this.client.request(createCartMutation, {
      locationId: location.id
    });

    return new Cart(this.client, response.createCart.cart);
  }

  /**
   * @async
   * @description Retrieves a cart by ID
   * @param {id} ID the ID of the cart
   * @protected
   * @todo Implement
   */
  private async get(id: Scalars["ID"]): Promise<Array<Cart>> {
    return undefined;
  }
}

export { Cart, Carts };
