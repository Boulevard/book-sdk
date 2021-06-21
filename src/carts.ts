import { gql } from "graphql-request";
import { cartQuery, createCartMutation } from "./carts/graph";
import { PlatformClient, PlatformTarget } from "./platformClient";
import { CreateCartInput, Location, Scalars } from "./graph";
import { Cart } from "./cart";

class Carts {
  /**
   * @internal
   * @param client
   */
  constructor(
    private platformClient: PlatformClient,
    private platformTarget: PlatformTarget = PlatformTarget.Sandbox
  ) {}

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
    const input: CreateCartInput = {
      locationId: location.id
    };
    const response = await this.platformClient.request(createCartMutation, {
      input
    });

    return new Cart(
      this.platformClient,
      response.createCart.cart,
      this.platformTarget,
      opts
    );
  }

  /**
   * @async
   * Retrieves a cart by ID
   *
   * @param {id} ID the ID of the cart
   * @protected
   */
  async get(id: Scalars["ID"], opts?: { timezone?: string }): Promise<Cart> {
    const response = await this.platformClient.request(cartQuery, {
      id
    });

    return new Cart(
      this.platformClient,
      response.cart,
      this.platformTarget,
      opts
    );
  }
}

export { Cart, Carts };
export * from "./cart";
