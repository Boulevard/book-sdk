import { gql } from "graphql-request";
import {
  addBookableItemMutation,
  addCardPaymentMethodMutation,
  addGiftCardItemMutation,
  addPurchasableItemMutation,
  getDatesQuery,
  getTimesQuery,
  reserveCartMutation,
  updateCartMutation
} from "./carts/graph";
import { PlatformClient } from "./platformClient";
import {
  Cart as GraphCart,
  CartAvailableCategory,
  CartItem,
  CartBookableTime,
  CartBookableDate,
  Scalars,
  CartClientInformationInput,
  CartAvailableBookableItemStaffVariant,
  CartOffer,
  CartBookableItem,
  CartItemPaymentMethod,
  CartAdvanceGratuityInput,
  CartGiftCardItem,
  CartGuest,
  CartAvailableBookableItemOption,
  GiftCardDesign,
  CartPurchasableItem
} from "./graph";

class Cart {
  availableCategories: Array<CartAvailableCategory>;
  selectedItems: Array<CartItem>;
  /**
   * @internal
   */
  private paymentToken?: string;
  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient, private cart: GraphCart) {
    this.availableCategories = cart.availableCategories;
    this.selectedItems = [];
  }

  /**
   * @async
   * @category Checkout & Payment
   * @description Add a credit card payment method to a cart.
   * @public
   * @returns {Promise} Promise containing the updated cart
   */
  async addCardPaymentMethod(details: {
    card: {
      name: string;
      number: string;
      cvv: string;
      exp_month: number;
      exp_year: number;
    };
  }): Promise<Cart> {
    // TODO: Make environment-specific
    const response = await fetch(
      "https://pci.staging-boulevard.app/cards/tokenize",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
      }
    );
    const { token } = await response.json();
    await this.platformClient.request(addCardPaymentMethodMutation, {
      id: this.cart.id,
      token: this.paymentToken,
      select: true
    });
    this.paymentToken = token;
    return this;
  }

  /**
   * @async
   * @category Offers
   * @description Add an offer to a cart
   * @param offerCode The offer code identifier
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement
   */
  async addOffer(offerCode: string) {
    return undefined;
  }

  /**
   * @async
   * @category Bookable Items
   * @description Add a bookable item to a cart
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement optional arguments
   */
  async addBookableItem(item: CartItem): Promise<Cart> {
    await this.platformClient.request(addBookableItemMutation, {
      id: this.cart.id,
      itemId: item.id
    });

    return this;
  }

  /**
   * @async
   * @category Gift Cards
   * @description Add a gift card item to a cart
   * @param price Price applied to the gift card item
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement optional arguments
   */
  async addGiftCardItem(
    item: CartItem,
    price: Scalars["Money"]
  ): Promise<Cart> {
    await this.platformClient.request(addGiftCardItemMutation, {
      id: this.cart.id,
      itemId: item.id
    });

    return this;
  }

  /**
   * @async
   * @category Purchasable Items
   * @description Add a purchasable item to a cart
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement optional arguments
   */
  async addPurchasableItem(item: CartItem): Promise<Cart> {
    await this.platformClient.request(addPurchasableItemMutation, {
      id: this.cart.id,
      itemId: item.id
    });

    return this;
  }

  /**
   * @async
   * @category Gift Cards
   * @description Create an email fulfillment for a gift card item. A digital copy of the gift card will be sent to the recipient after the order is completed.
   * @public
   * @param itemId ID - ID of the CartGiftCardItem.
   * @param sender The name of the person sending the item.
   * @param recipientEmail The email of the person receiving the item
   * @param recipientName The name of the person receiving the item
   * @todo Implement
   */
  async createGiftCardItemEmailFulfillment(
    itemId: Scalars["ID"],
    sender: string,
    recipientEmail: Scalars["Email"],
    recipientName: string
  ): Promise<unknown> {
    return undefined;
  }

  /**
   * @async
   * @category Guests
   * @description Add a guest to a cart.
   * @public
   * @todo Implement
   */
  async createGuest(email: Scalars["Email"]): Promise<unknown> {
    return undefined;
  }

  /**
   * @async
   * @category Gift Cards
   * @description Delete a gift card item email fulfillment.
   * @public
   * @param itemId ID - ID of the CartGiftCardItem.
   * @todo Implement
   */
  async deleteGiftCardItemEmailFulfillment(
    itemId: Scalars["ID"]
  ): Promise<unknown> {
    return undefined;
  }

  /**
   * @async
   * @category Guests
   * @description Delete a cart's guest. Using this invalidates existing reservations.
   * @public
   * @todo Implement
   */
  async deleteGuest(guestId: Scalars["ID"]): Promise<unknown> {
    return undefined;
  }

  /**
   * @async
   * @category Bookable Items
   * @description Retrieves available dates for all bookable cart items.
   * @public
   * @returns {Promise} Promise containing the list of Bookable Dates
   * @todo Implement Arguments
   */
  async getBookableDates(): Promise<Array<CartBookableDate>> {
    // TODO: TZ selection
    // Intl.DateTimeFormat().resolvedOptions().timeZone
    const response = await this.platformClient.request(getDatesQuery, {
      id: this.cart.id
    });

    return response.cartBookableDates;
  }

  /**
   * @async
   * @category Bookable Items
   * @description Retrieves available staff variants for a specific bookable cart item, given a time that was retrieved earlier using `getTimes`. In other words, returns all variants that can be selected for the item while still keeping the overall starting time.
   * @public
   * @param {timeId} ID - ID of the bookable time.
   * @param {itemId} ID - ID of the selected bookable item.
   * @returns {Promise} Promise containing the list of Bookable Item Staff Variants
   * @todo Implement
   */
  async getBookableStaffVariants(
    time: Scalars["ID"],
    itemId: Scalars["ID"]
  ): Promise<Array<CartAvailableBookableItemStaffVariant>> {
    return undefined;
  }

  /**
   * @async
   * @category Bookable Items
   * @description Retrieves available times for all bookable cart items, given a date that was retrieved earlier using `getDates`.
   * @public
   * @param {date} Date - an ISO8601 string for the date that should be searched through.
   * @returns {Promise} Promise containing the list of Bookable Times
   */
  async getBookableTimes(
    date: Scalars["Date"]
  ): Promise<Array<CartBookableTime>> {
    const response = await this.platformClient.request(getTimesQuery, {
      id: this.cart.id,
      searchDate: date
    });

    return response.cartBookableTimes;
  }

  /**
   * @async
   * @category Offers
   * @description Remove an offer from the cart.
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement
   */
  async removeOffer(offer: CartOffer): Promise<Cart> {
    return undefined;
  }

  /**
   * @async
   * @description Remove a selected item from a cart. Using this invalidates existing reservations when the item being removed is a bookable item.
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement
   */
  async removeSelectedItem(id: Scalars["ID"]): Promise<Cart> {
    return undefined;
  }

  /**
   * @async
   * @category Bookable Items
   * @description Reserve one starting time for bookable cart items, i.e. all bookable items are to be performed starting at this time. Note that this call may fail if the time is no longer available.
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement
   */
  async reserveBookableItems(bookableTime: CartBookableTime): Promise<Cart> {
    await this.platformClient.request(reserveCartMutation, {
      id: this.cart.id,
      bookableTimeId: bookableTime.id
    });

    return this;
  }

  /**
   * @async
   * @category Checkout & Payment
   * @description Select an available payment method to be used with all selected cart items. Note that this call may fail if the payment method is not compatible with all items.
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement
   */
  async selectPaymentMethod(item: CartItemPaymentMethod): Promise<Cart> {
    return undefined;
  }

  /**
   * @async
   * @category Details
   * @description Take ownership of a cart, linking the cart to a Boulevard account.
   * @protected
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement
   */
  async takeOwnership(): Promise<Cart> {
    return undefined;
  }

  /**
   * @async
   * @category Details
   * @description Cart fields to update. Only some fields can be updated, there are other operations available to update more fields.
   * @public
   * @returns {Promise} Promise containing the updated cart
   */
  async update(opts: {
    advanceGratuity?: CartAdvanceGratuityInput;
    clientInformation?: CartClientInformationInput;
    clientMessage?: string;
    discountCode?: string;
  }): Promise<Cart> {
    await this.platformClient.request(updateCartMutation, {
      id: this.cart.id,
      ...opts
    });

    return this;
  }

  /**
   * @async
   * @category Gift Cards
   * @description Update a gift card item email fulfillment.
   * @public
   * @todo Implement
   */
  async updateGiftCardItemEmailFulfillment(
    item: CartGiftCardItem,
    opts: {
      deliveryDate?: Scalars["Date"];
      messageFromSender?: string;
      recipientEmail?: Scalars["Date"];
      recipientName?: string;
      senderName?: string;
    }
  ): Promise<unknown> {
    return undefined;
  }

  /**
   * @async
   * @category Guests
   * @description Update a cart's guest.
   * @public
   * @todo Implement
   */
  async updateGuest(
    guest: CartGuest,
    opts: {
      email?: Scalars["Email"];
      firstName?: string;
      lastName?: string;
      phoneNumber?: Scalars["PhoneNumber"];
    }
  ): Promise<unknown> {
    return undefined;
  }

  /**
   * @async
   * @category Bookable Items
   * @description Update a cart's selected bookable item.
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement
   */
  async updateSelectedBookableItem(
    item: CartBookableItem,
    opts: {
      discountCode?: string;
      guest?: CartGuest;
      options?: Array<CartAvailableBookableItemOption>;
      staffVariant?: CartAvailableBookableItemStaffVariant;
    }
  ): Promise<Cart> {
    return undefined;
  }

  /**
   * @async
   * @category Gift Card Items
   * @description Update a cart's selected gift card item.
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement
   */
  async updateSelectedGiftCardItem(
    item: CartGiftCardItem,
    opts: {
      design?: GiftCardDesign;
      price?: Scalars["Money"];
    }
  ): Promise<Cart> {
    return undefined;
  }

  /**
   * @async
   * @category Purchasable Items
   * @description Update a cart's selected purchasable item.
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement
   */
  async updateSelectedPurchasableItem(
    item: CartPurchasableItem,
    opts: {
      discountCode?: string;
    }
  ): Promise<Cart> {
    return undefined;
  }

  /**
   * @async
   * @category Checkout & Payment
   * @description Completes the checkout process.
   * @public
   * @returns {Promise} Promise containing the updated cart
   * @todo Implement
   */
  async checkout() {
    return undefined;
  }
}

export { Cart };
