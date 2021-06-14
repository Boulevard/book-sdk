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
  CartPurchasableItem,
  CartSummary,
  CartFeatures,
  CartError,
  CartClientInformation,
  CartAdvanceGratuity,
  CartAvailableItem,
  Location,
  CreateCartGuestInput
} from "./graph";

class Cart
  implements Omit<GraphCart, "availableItem" | "startTimeId" | "selectedItem"> {
  advanceGratuity?: CartAdvanceGratuity;
  /**
   * Categories of items available to be checked out.
   *
   * Note that this list updates as the cart changes. For instance, some
   * incompatible items may be disabled after others are added to the cart.
   *
   * Clients should retrieve this list again after mutations or make sure errors
   * are handled when items cannot be added.
   */
  availableCategories: Array<CartAvailableCategory>;
  /**
   * Payment methods available for this cart. Some methods may already be
   * present, for instance when the current user is authenticated. Additional
   * methods can be added using the `addCart...PaymentMethod` mutations.
   *
   * Note that not all of these payment methods can be used with every cart item.
   * Subsets of supported payment methods are available through the item objects
   * instead.
   */
  availablePaymentMethods: Array<CartItemPaymentMethod>;
  /**
   * Optional client information supplied when checking out on behalf of someone
   * else than the current user.
   */
  clientInformation?: CartClientInformation;
  /** Optional message from the client to the business. */
  clientMessage?: Scalars["String"];
  /**
   * Timestamp of when the cart was completed.
   *
   * This field cannot be edited and once completed cannot be changed.
   */
  completedAt?: Scalars["DateTime"];
  /**
   * When the cart has reserved bookable items, the end time of the latest item.
   * This value is `null` when there are no reservations.
   */
  endTime?: Scalars["NaiveDateTime"];
  /** Current validation errors. */
  errors: Array<CartError>;
  /**
   * When the cart has reserved bookable items, the timestamp when reservations
   * (e.g. service time selections) expire and need to be selected again. This
   * value is `null` when there are no reservations and is reset into the future
   * whenever a new reservation is added.
   */
  expiresAt?: Scalars["DateTime"];
  /** Features available to the cart. */
  features: CartFeatures;
  /** A list of guests added to the cart */
  guests: Array<CartGuest>;
  /** The ID of an object */
  id: Scalars["ID"];
  /** Timestamp when the cart was created. */
  insertedAt: Scalars["DateTime"];
  /** Location associated with the cart */
  location: Location;
  /**
   * A list of offers applied to the cart.
   *
   * Offers can be applied manually using `addCartOffer` and an offer code, but
   * it's also possible for offers to be auto-applied. At this time auto-applied
   * offers cannot be removed from the cart.
   */
  offers: Array<CartOffer>;
  /**
   * All selected items pending checkout.
   *
   * Note that the ordering of this list is not stable, and may change depending
   * on the current state of the cart.
   */
  selectedItems: Array<CartItem>;
  /**
   * When the cart has reserved bookable items, the starting time of the earliest
   * item. This value is `null` when there are no reservations.
   */
  startTime?: Scalars["NaiveDateTime"];
  /** Summary of the cart, including e.g. line item totals. */
  summary: CartSummary;

  timezone: string;

  /** Timestamp when the cart was last updated. */
  updatedAt: Scalars["DateTime"];

  /**
   * @internal
   */
  private paymentToken?: string;
  /**
   * @internal
   */
  constructor(
    private platformClient: PlatformClient,
    cart: GraphCart,
    opts?: { timezone?: string }
  ) {
    this.timezone =
      opts?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    Object.assign(this, cart);
  }

  /**
   * Add a credit card payment method to a cart.
   *
   * @async
   * @category Checkout & Payment
   * @public
   * @returns Promise containing the updated cart
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
      id: this.id,
      token: this.paymentToken,
      select: true
    });
    this.paymentToken = token;
    return this;
  }

  /**
   * Add an offer to a cart
   *
   * @async
   * @category Offers
   * @param offerCode The offer code identifier
   * @public
   * @todo Implement
   * @todo Confirm return type
   */
  async addOffer(offerCode: string): Promise<Cart> {
    return undefined;
  }

  /**
   * Add a bookable item to a cart
   *
   * @async
   * @category Bookable Items
   * @param item The bookable item
   * @param opts.discountCode Optional discount code applied to the item. Invalid discount codes are ignored without an error, check `discountCode` on the selected item to see if the code was valid.
   * @param opts.guest The guest this item is booked for. A null value indicates the cart owner, or current client. When finding available times for bookable items, it's assumed that two items having different guests can be booked simultaneously.
   * @param opts.options Selected bookable item options. Note that the selections must conform to the option group requirements, e.g. limits on the number of options. Otherwise an error is returned.
   * @param opts.staffVariant The selected bookable item staff variant.
   * @public
   * @returns Promise containing the updated cart
   */
  async addBookableItem(
    item: CartBookableItem,
    opts?: {
      discountCode?: string;
      guest?: CartGuest;
      options?: Array<CartAvailableBookableItemOption>;
      staffVariant?: CartAvailableBookableItemStaffVariant;
    }
  ): Promise<Cart> {
    await this.platformClient.request(addBookableItemMutation, {
      id: this.id,
      itemId: item.id,
      itemDiscountCode: opts?.discountCode,
      itemGuestId: opts?.guest?.id,
      itemOptionIds: opts?.options,
      itemStaffVariantId: opts?.staffVariant?.id
    });

    return this;
  }

  /**
   * Add a gift card item to a cart
   *
   * @async
   * @category Gift Cards
   * @param item The gift card item
   * @param price Price applied to the gift card item
   * @public
   * @returns Promise containing the updated cart
   */
  async addGiftCardItem(
    item: CartGiftCardItem,
    price: Scalars["Money"]
  ): Promise<Cart> {
    await this.platformClient.request(addGiftCardItemMutation, {
      id: this.id,
      itemId: item.id
    });

    return this;
  }

  /**
   * Add a purchasable item to a cart
   *
   * @async
   * @category Purchasable Items
   * @param item The purchasable item
   * @param opts.discountCode Discount code applied to the item. Invalid discount codes are ignored without an error, check `discountCode` on the selected item to see if the code was valid.
   * @public
   * @returns Promise containing the updated cart
   */
  async addPurchasableItem(
    item: CartPurchasableItem,
    opts?: { discountCode?: string }
  ): Promise<Cart> {
    await this.platformClient.request(addPurchasableItemMutation, {
      id: this.id,
      itemId: item.id,
      itemDiscountCode: opts?.discountCode
    });

    return this;
  }

  /**
   * Completes the checkout process.
   *
   * This will first check for any errors in the cart, aborting if any errors exist.
   * Then, it will lock the cart, proceed to attempt to charge the card for any purchaseable items,
   * book all appointments, send relevant email receipts and confirmations, and then mark the cart as completed.
   *
   * @async
   * @category Checkout & Payment
   * @public
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async checkout(): Promise<Cart> {
    return undefined;
  }

  /**
   * Create an email fulfillment for a gift card item. A digital copy of the gift card will be sent to the recipient after the order is completed.
   *
   * @async
   * @category Gift Cards
   * @public
   * @param item The CartGiftCardItem.
   * @param sender The name of the person sending the item.
   * @param recipient.email The email of the person receiving the item
   * @param recipient.name The name of the person receiving the item
   * @param opts.message A message to include from the sender
   * @todo Implement
   * @todo Determine return type
   */
  async createGiftCardItemEmailFulfillment(
    item: CartGiftCardItem,
    sender: string,
    recipient: { email: Scalars["Email"]; name: string },
    opts?: { message?: string }
  ): Promise<unknown> {
    return undefined;
  }

  /**
   * Add a guest to a cart.
   *
   * @async
   * @category Guests
   * @public
   * @todo Implement
   * @todo Determine return type
   */
  async createGuest(input: {
    email?: Scalars["Email"];
    firstName?: Scalars["String"];
    lastName?: Scalars["String"];
    phoneNumber?: Scalars["PhoneNumber"];
  }): Promise<unknown> {
    return undefined;
  }

  /**
   * Delete a gift card item email fulfillment.
   *
   * @async
   * @category Gift Cards
   * @public
   * @param item The CartGiftCardItem.
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async deleteGiftCardItemEmailFulfillment(
    item: CartGiftCardItem
  ): Promise<Cart> {
    return undefined;
  }

  /**
   * Delete a cart's guest. Using this invalidates existing reservations.
   *
   * @async
   * @category Guests
   * @public
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async deleteGuest(guest: CartGuest): Promise<Cart> {
    return undefined;
  }

  /**
   * Retrieves available dates for all bookable cart items.
   *
   * @async
   * @category Bookable Items
   * @param opts.searchRangeLower Lower (inclusive) search range bound. When null, the current date plus the location's minimum booking lead time (i.e. the earliest possible date to book) is used.
   * @param opts.searchRangeUpper Upper (inclusive) search range bound. When null, the lower bound plus one week is used.
   * @param opts.timezone Optional override for the timezone set in {@link Carts.create}
   * @public
   * @returns Promise containing the list of Bookable Dates
   * @todo Implement Arguments
   */
  async getBookableDates(opts: {
    searchRangeLower?: Scalars["Date"];
    searchRangeUpper?: Scalars["Date"];
    timezone?: string;
  }): Promise<Array<CartBookableDate>> {
    const response = await this.platformClient.request(getDatesQuery, {
      id: this.id,
      tz: opts?.timezone || this.timezone
    });

    return response.cartBookableDates;
  }

  /**
   *
   * Retrieves available staff variants for a specific bookable cart item, given
   * a time that was retrieved earlier using `cartBookableTimes`. In other words,
   * returns all variants that can be selected for the item while still keeping
   * the overall starting time.
   *
   * #### Caveats
   *
   * Because this query assumes that variants of other items stay constant,
   * variants of multiple items must be updated separately by retrieving the
   * variants for one item first, updating that item, and then retrieving the
   * variants for another item.
   *
   * Timing of an item is affected when the variant is updated, which is why any
   * existing reservations are invalidated and the times must be reserved again
   * using `reserveCartBookableItems`.
   *
   * @async
   * @category Bookable Items
   * @public
   * @param time The bookable time.
   * @param item The selected bookable item.
   * @returns Promise containing the list of Bookable Item Staff Variants
   * @todo Implement
   */
  async getBookableStaffVariants(
    time: CartBookableTime,
    item: CartBookableItem
  ): Promise<Array<CartAvailableBookableItemStaffVariant>> {
    return undefined;
  }

  /**
   * Retrieves available times for all bookable cart items, given a date that was retrieved earlier using `getDates`.
   *
   * @async
   * @category Bookable Items
   * @public
   * @param {date} Date - an ISO8601 string for the date that should be searched through.
   * @param opts.timezone Optional override for the timezone set in {@link Carts.create}
   * @returns Promise containing the list of Bookable Times
   */
  async getBookableTimes(
    date: Scalars["Date"],
    opts?: { timezone?: string }
  ): Promise<Array<CartBookableTime>> {
    const response = await this.platformClient.request(getTimesQuery, {
      id: this.id,
      searchDate: date,
      tz: opts?.timezone || this.timezone
    });

    return response.cartBookableTimes;
  }

  /**
   * Remove an offer from the cart.
   *
   * @async
   * @category Offers
   * @param offer The Offer code
   * @public
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async removeOffer(offer: CartOffer): Promise<Cart> {
    return undefined;
  }

  /**
   * Remove a selected item from a cart. Using this invalidates existing reservations when the item being removed is a bookable item.
   *
   * @async
   * @public
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async removeSelectedItem(
    item: CartBookableItem | CartGiftCardItem | CartPurchasableItem
  ): Promise<Cart> {
    return undefined;
  }

  /**
   * Reserve one starting time for bookable cart items, i.e. all bookable items are to be performed starting at this time.
   * Note that this call may fail if the time is no longer available.
   *
   * @async
   * @category Bookable Items
   * @public
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async reserveBookableItems(bookableTime: CartBookableTime): Promise<Cart> {
    await this.platformClient.request(reserveCartMutation, {
      id: this.id,
      bookableTimeId: bookableTime.id
    });

    return this;
  }

  /**
   * Select an available payment method to be used with all selected cart items.
   * Note that this call may fail if the payment method is not compatible with all items.
   *
   * This is currently the only way to associate payment methods with cart items.
   * Other mutations may be added later in order to support more complex payment scenarios.
   *
   * @async
   * @category Checkout & Payment
   * @public
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async selectPaymentMethod(
    paymentMethod: CartItemPaymentMethod
  ): Promise<Cart> {
    return undefined;
  }

  /**
   * Take ownership of a cart, linking the cart to a Boulevard account.
   *
   * Using this mutation invalidates existing reservations.
   *
   * @async
   * @category Details
   * @protected
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async takeOwnership(): Promise<Cart> {
    return undefined;
  }

  /**
   * Update a cart. Only some fields can be updated, there are other operations available to update more fields.
   *
   * @async
   * @category Details
   * @public
   * @returns Promise containing the updated cart
   */
  async update(opts: {
    advanceGratuity?: CartAdvanceGratuityInput;
    clientInformation?: CartClientInformationInput;
    clientMessage?: string;
    discountCode?: string;
  }): Promise<Cart> {
    await this.platformClient.request(updateCartMutation, {
      id: this.id,
      ...opts
    });

    return this;
  }

  /**
   * Update a gift card item email fulfillment.
   *
   * @async
   * @category Gift Cards
   * @param opts.sender.name The name of the person sending the item.
   * @param opts.recipient.email The email of the person receiving the item
   * @param opts.recipient.name The name of the person receiving the item
   * @param opts.message A message to include from the sender
   * @public
   * @todo Implement
   * @todo Determine return type
   */
  async updateGiftCardItemEmailFulfillment(
    item: CartGiftCardItem,
    opts?: {
      deliveryDate?: Scalars["Date"];
      message?: string;
      recipient: { email?: Scalars["Email"]; name?: string };
      sender?: { name?: string };
    }
  ): Promise<unknown> {
    return undefined;
  }

  /**
   * Update a cart's guest.
   *
   * @async
   * @category Guests
   * @public
   * @todo Implement
   * @todo Determine return type
   */
  async updateGuest(
    guest: CartGuest,
    opts?: {
      email?: Scalars["Email"];
      firstName?: string;
      lastName?: string;
      phoneNumber?: Scalars["PhoneNumber"];
    }
  ): Promise<unknown> {
    return undefined;
  }

  /**
   * Update a cart's selected bookable item.
   *
   * This invalidates existing reservations when the guest, staff variant, or options are updated.
   *
   * @async
   * @category Bookable Items
   * @param item The bookable item
   * @param opts.discountCode Optional discount code applied to the item. Invalid discount codes are ignored without an error, check `discountCode` on the selected item to see if the code was valid.
   * @param opts.guest The guest this item is booked for. A null value indicates the cart owner, or current client. When finding available times for bookable items, it's assumed that two items having different guests can be booked simultaneously.
   * @param opts.options Selected bookable item options. Note that the selections must conform to the option group requirements, e.g. limits on the number of options. Otherwise an error is returned.
   * @param opts.staffVariant The selected bookable item staff variant.
   * @public
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async updateSelectedBookableItem(
    item: CartBookableItem,
    opts?: {
      discountCode?: string;
      guest?: CartGuest;
      options?: Array<CartAvailableBookableItemOption>;
      staffVariant?: CartAvailableBookableItemStaffVariant;
    }
  ): Promise<Cart> {
    return undefined;
  }

  /**
   * Update a cart's selected gift card item.
   *
   * @async
   * @category Gift Card Items
   * @param item The gift card item
   * @param opts.price Price applied to the gift card item
   * @public
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async updateSelectedGiftCardItem(
    item: CartGiftCardItem,
    opts?: {
      design?: GiftCardDesign;
      price?: Scalars["Money"];
    }
  ): Promise<Cart> {
    return undefined;
  }

  /**
   * Update a cart's selected purchasable item.
   *
   * @async
   * @category Purchasable Items
   * @param opts.discountCode Optional discount code applied to the item. Invalid discount codes are ignored without an error, check `discountCode` on the selected item to see if the code was valid.
   * @public
   * @returns Promise containing the updated cart
   * @todo Implement
   */
  async updateSelectedPurchasableItem(
    item: CartPurchasableItem,
    opts?: {
      discountCode?: string;
    }
  ): Promise<Cart> {
    return undefined;
  }
}

export { Cart };
