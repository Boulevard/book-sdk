import { gql } from "graphql-request";
import {
  addCardPaymentMethodMutation,
  addItemMutation,
  createCartMutation,
  getDatesQuery,
  getTimesQuery,
  reserveCartMutation,
  updateCartMutation
} from "./carts/graph";
import { Client } from "./client";
import {
  Location,
  // TODO: Handle the naming conflicts between the generated types and the SDK
  Cart as GraphQLCart,
  CartAvailableCategory,
  CartItem,
  CartBookableTime,
  CartBookableDate,
  Scalars,
  CartClientInformationInput,
  CartAvailableBookableItemStaffVariant
} from "./graph";

type AddItemType = "ProductLocation" | "Service";

type PaymentDetails = {
  card: {
    name: string;
    number: string;
    cvv: string;
    exp_month: number;
    exp_year: number;
  };
};

class Cart {
  availableCategories: Array<CartAvailableCategory>;
  selectedItems: Array<CartItem>;
  /**
   * @internal
   */
  constructor(private client: Client, private cart: GraphQLCart) {
    this.availableCategories = cart.availableCategories;
    this.selectedItems = [];
  }

  async addItem(item: CartItem): Promise<Cart> {
    const [_urn, _blvd, type, _id] = item.id.split(":") as [
      string,
      string,
      AddItemType,
      string
    ];
    const mutation = {
      ProductLocation: "addCartSelectedPurchasableItem",
      Service: "addCartSelectedBookableItem"
    }[type];

    const response = await this.client.request(addItemMutation(mutation), {
      id: this.cart.id,
      itemId: item.id
    });
    // We need to create a new instance so reactive frameworks detect the change.
    // Is this the best approach?
    const newCart = new Cart(this.client, response[mutation].cart);
    newCart.availableCategories = this.availableCategories;
    newCart.selectedItems = response[mutation].cart.selectedItems;

    return newCart;
  }

  /**
   * @async
   * @description Retrieves available dates for all bookable cart items.
   * @public
   * @returns {Promise} Promise containing the list of Bookable Dates
   * @todo Implement Arguments
   */
  async getDates(): Promise<Array<CartBookableDate>> {
    // TODO: TZ selection
    // Intl.DateTimeFormat().resolvedOptions().timeZone
    const response = await this.client.request(getDatesQuery, {
      id: this.cart.id
    });

    return response.cartBookableDates;
  }

  /**
   * @async
   * @description Retrieves available staff variants for a specific bookable cart item, given a time that was retrieved earlier using `getTimes`. In other words, returns all variants that can be selected for the item while still keeping the overall starting time.
   * @public
   * @param {timeId} ID - ID of the bookable time.
   * @param {itemId} ID - ID of the selected bookable item.
   * @returns {Promise} Promise containing the list of Bookable Item Staff Variants
   * @todo Implement
   */
  async getStaffVariants(
    timeId: Scalars["ID"],
    itemId: Scalars["ID"]
  ): Promise<Array<CartAvailableBookableItemStaffVariant>> {
    return undefined;
  }

  /**
   * @async
   * @description Retrieves available times for all bookable cart items, given a date that was retrieved earlier using `getDates`.
   * @public
   * @param {date} Date - an ISO8601 string for the date that should be searched through.
   * @returns {Promise} Promise containing the list of Bookable Times
   */
  async getTimes(date: Scalars["Date"]): Promise<Array<CartBookableTime>> {
    const response = await this.client.request(getTimesQuery, {
      id: this.cart.id,
      searchDate: date
    });

    return response.cartBookableTimes;
  }

  async reserve(time: CartBookableTime): Promise<Cart> {
    await this.client.request(reserveCartMutation, {
      id: this.cart.id,
      bookableTimeId: time.id
    });

    return this;
  }

  async update(clientInformation: CartClientInformationInput) {
    await this.client.request(updateCartMutation, {
      id: this.cart.id,
      clientInformation
    });

    return this;
  }

  async book(details: PaymentDetails) {
    // TODO: Make enviornment-specific
    fetch("https://pci.staging-boulevard.app/cards/tokenize", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    })
      .then(response => response.json())
      .then(this.checkout.bind(this));
  }

  async checkout(resp: { token: string }) {
    await this.client.request(addCardPaymentMethodMutation, {
      id: this.cart.id,
      token: resp.token,
      select: true
    });
    return this;
  }
}

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
