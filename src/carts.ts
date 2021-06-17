import { gql } from "graphql-request";
import { cartQuery, createCartMutation } from "./carts/graph";
import { PlatformClient } from "./platformClient";
import { Location, Scalars } from "./graph";
import {
  Cart,
  CartAvailableBookableItemStaffVariant,
  CartBookableDate,
  CartBookableTime,
  CartGuest,
  CartItemEmailFulfillment,
  CartItemPaymentMethod,
  CartSummary
} from "./cart";

class Carts {
  /**
   * @internal
   * @param client
   */
  constructor(private platformClient: PlatformClient) {}

  /**
   * @async
   * Creates a new Cart
   *
   * @param opts.timezone Optional time zone that {@link CartBookableDate} and {@link CartBookableTime} should be converted to, e.g. the client's time zone. The search range dates are also interpreted using this. When omitted, the browser timezone is used.
   * @protected
   */
  async create(
    location: Location,
    opts?: { timezone?: string }
  ): Promise<Cart> {
    const response = await this.platformClient.request(createCartMutation, {
      locationId: location.id
    });

    return new Cart(this.platformClient, response.createCart.cart, opts);
  }

  /**
   * @async
   * Retrieves a cart by ID
   *
   * @param {id} ID the ID of the cart
   * @protected
   */
  private async get(
    id: Scalars["ID"],
    opts?: { timezone?: string }
  ): Promise<Cart> {
    const response = await this.platformClient.request(cartQuery, {
      id
    });

    return new Cart(this.platformClient, response.cart, opts);
  }
}

export {
  Cart,
  Carts,
  CartAvailableBookableItemStaffVariant,
  CartBookableDate,
  CartBookableTime,
  CartGuest,
  CartItemEmailFulfillment,
  CartItemPaymentMethod,
  CartSummary
};
