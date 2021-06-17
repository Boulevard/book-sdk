import { gql } from "graphql-request";
import { createCartMutation } from "./carts/graph";
import { PlatformClient } from "./platformClient";
import { Location, Scalars } from "./graph";
import {
  Cart,
  CartAdvanceGratuity,
  CartAdvanceGratuityInput,
  CartAvailableBookableItemOption,
  CartAvailableBookableItemStaffVariant,
  CartBookableDate,
  CartBookableItem,
  CartBookableTime,
  CartClientInformation,
  CartClientInformationInput,
  CartError,
  CartGiftCardItem,
  CartGuest,
  CartItemEmailFulfillment,
  CartItemPaymentMethod,
  CartSummary,
  DepositType
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
   * @todo Implement
   */
  private async get(id: Scalars["ID"]): Promise<Cart> {
    return undefined;
  }
}

export {
  Cart,
  Carts,
  CartAdvanceGratuity,
  CartAdvanceGratuityInput,
  CartAvailableBookableItemOption,
  CartAvailableBookableItemStaffVariant,
  CartBookableDate,
  CartBookableItem,
  CartBookableTime,
  CartClientInformation,
  CartClientInformationInput,
  CartError,
  CartGiftCardItem,
  CartGuest,
  CartItemEmailFulfillment,
  CartItemPaymentMethod,
  CartSummary,
  DepositType
};
