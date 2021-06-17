import * as graph from "./carts/graph";
import { Node, PlatformClient, PlatformTarget } from "./platformClient";
import {
  Scalars,
  Maybe,
  CartAdvanceGratuityInput,
  CartClientInformationInput,
  DepositType
} from "./graph";
import { CartErrorCode } from "./graph";
import * as Graph from "./graph";
import { Location } from "./locations";
import {
  CartAvailableBookableItem,
  CartAvailableBookableItemOption,
  CartAvailableBookableItemStaffVariant,
  CartAvailableGiftCardItem,
  CartAvailableItem,
  CartAvailablePurchasableItem,
  CartBookableItem,
  CartGiftCardItem,
  CartItem,
  CartItemEmailFulfillment,
  CartItemPaymentMethod,
  CartPurchasableItem
} from "./carts/items";
import { CartGuest } from "./carts/guests";

/** Gratuity set in advance for bookable items. */
class CartAdvanceGratuity extends Node<Graph.CartAdvanceGratuity> {
  fixed?: Maybe<Scalars["Money"]>;

  /** Percentage gratuity amount, has to be set if `fixed` is not set. */
  percentage?: Maybe<Scalars["Float"]>;
}

/** Category of items that can be checked out. */
class CartAvailableCategory extends Node<Graph.CartAvailableCategory> {
  /**
   * Items available to be checked out.
   *
   * Note that this list updates as the cart changes. For instance, incompatible
   * items may be disabled after others are added to the cart. Clients should
   * retrieve this list again after mutations or make sure errors are handled
   * when items cannot be added.
   */
  availableItems: Array<
    | CartAvailableBookableItem
    | CartAvailableGiftCardItem
    | CartAvailablePurchasableItem
  >;

  /** Short optional description. */
  description: Maybe<Scalars["String"]>;

  /** Whether the category should appear as disabled. */
  disabled: Scalars["Boolean"];

  /** Message detailing why `disabled` is set. Might not be available. */
  disabledDescription: Maybe<Scalars["String"]>;

  /** Short human-readable name. */
  name: Scalars["String"];

  /**
   * @internal
   */
  constructor(
    platformClient: PlatformClient,
    category: Graph.CartAvailableCategory
  ) {
    super(platformClient, category);
    this.availableItems = category.availableItems.map(
      (
        item:
          | Graph.CartAvailableBookableItem
          | Graph.CartAvailableGiftCardItem
          | Graph.CartAvailablePurchasableItem
      ) => {
        switch (item.__typename) {
          case "CartAvailableBookableItem":
            return new CartAvailableBookableItem(this.platformClient, item);
          case "CartAvailableGiftCardItem":
            return new CartAvailableGiftCardItem(this.platformClient, item);
          case "CartAvailablePurchasableItem":
            return new CartAvailablePurchasableItem(this.platformClient, item);
        }
      }
    );
  }
}

/** Available starting date for bookable items in a cart. */
class CartBookableDate extends Node<Graph.CartBookableDate> {
  /**
   * Available date for the bookable items.
   *
   * Note that this date may differ from the one at the location when a specific
   * time zone is requested using the `tz` argument. The date uses the requested
   * time zone, or the location's time zone when `tz` is null.
   */
  date: Scalars["Date"];
}

/** Available starting time for bookable items in a cart. */
class CartBookableTime extends Node<Graph.CartBookableTime> {
  /** ID of this particular time. */
  id: Scalars["ID"];

  /** Available start time for the earliest bookable item. */
  startTime: Scalars["DateTime"];
}

/**
 * Client information supplied when checking out as a new user or on behalf of
 * someone else than the current user.
 */
class CartClientInformation extends Node<Graph.CartClientInformation> {
  /** Email address. */
  email?: Maybe<Scalars["Email"]>;

  /** First name. */
  firstName: Scalars["String"];

  /** Last name. */
  lastName?: Maybe<Scalars["String"]>;

  /** Mobile phone number. */
  phoneNumber?: Maybe<Scalars["PhoneNumber"]>;
}

/** Cart validation error. */
class CartError extends Node<Graph.CartError> {
  /** Machine-readable code. */
  code: CartErrorCode;

  /** Detailed geek-readable description. */
  description: Scalars["String"];

  /** Short human-readable message. */
  message: Scalars["String"];
}

/** Features available to the cart. */
class CartFeatures extends Node<Graph.CartFeatures> {
  /** Whether gift cards are available to be purchased in this cart. */
  giftCardPurchaseEnabled: Scalars["Boolean"];

  /** Whether payment info is required to check out services in this cart. */
  paymentInfoRequired: Scalars["Boolean"];
}

/** Offer added to a cart, see the `offers` field. */
class CartOffer extends Node<Graph.CartOffer> {
  /**
   * Whether this offer is applied to any items currently in the cart.
   *
   * Offers that are not applicable are still valid (i.e. they exist and can be
   * used) but there are no items in the current cart that could be affected.
   * When applicable items are added later, the offer is applied then.
   */
  applied: Scalars["Boolean"];

  /** Case-insensitive, uniquely identifying code. */
  code: Scalars["String"];

  /** ID of the offer. */
  id: Scalars["ID"];

  /** Human-readable name. */
  name: Scalars["String"];
}

/** Summary of the cart, including e.g. line item totals. */
class CartSummary extends Node<Graph.CartSummary> {
  deposit: DepositType;

  /** Total required deposit amount. */
  depositAmount: Scalars["Money"];

  /** Total discount amount on the subtotal. */
  discountAmount: Scalars["Money"];

  /** Total gratuity amount on the subtotal. */
  gratuityAmount: Scalars["Money"];

  /** Whether a payment method is required */
  paymentMethodRequired: Scalars["Boolean"];

  /** Rounding amount on the discounted and taxed subtotal. */
  roundingAmount: Scalars["Money"];

  /** Subtotal before gratuity, discounts, taxes, and rounding. */
  subtotal: Scalars["Money"];

  /** Total tax amount on the discounted subtotal. */
  taxAmount: Scalars["Money"];

  /** Total after gratuity, discounts, taxes, and rounding. */
  total: Scalars["Money"];
}

class Cart extends Node<Graph.Cart> {
  /** Optional gratuity defined in advance for bookable items. */
  advanceGratuity: Maybe<CartAdvanceGratuity>;

  /**
   * Optional client information supplied when checking out on behalf of someone
   * else than the current user.
   */
  clientInformation: Maybe<CartClientInformation>;

  /** Optional message from the client to the business. */
  clientMessage: Maybe<Scalars["String"]>;

  /**
   * Timestamp of when the cart was completed.
   *
   * This field cannot be edited and once completed cannot be changed.
   */
  completedAt: Maybe<Scalars["DateTime"]>;

  /**
   * When the cart has reserved bookable items, the end time of the latest item.
   * This value is `null` when there are no reservations.
   */
  endTime: Maybe<Scalars["NaiveDateTime"]>;

  /** Current validation errors. */
  errors: Array<CartError>;

  /**
   * When the cart has reserved bookable items, the timestamp when reservations
   * (e.g. service time selections) expire and need to be selected again. This
   * value is `null` when there are no reservations and is reset into the future
   * whenever a new reservation is added.
   */
  expiresAt: Maybe<Scalars["DateTime"]>;

  /** The ID of an object */
  id: Scalars["ID"];

  /** Timestamp when the cart was created. */
  insertedAt: Scalars["DateTime"];

  /**
   * When the cart has reserved bookable items, the starting time of the earliest
   * item. This value is `null` when there are no reservations.
   */
  startTime: Maybe<Scalars["NaiveDateTime"]>;

  /** Summary of the cart, including e.g. line item totals. */
  summary: CartSummary;

  /** Timestamp when the cart was last updated. */
  updatedAt: Scalars["DateTime"];

  /**
   * @internal
   */
  private timezone: string;

  /**
   * @internal
   */
  constructor(
    platformClient: PlatformClient,
    cart: Graph.Cart,
    platformTarget: PlatformTarget,
    opts?: { timezone?: string }
  ) {
    super(platformClient, cart, platformTarget);
    this.timezone =
      opts?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.summary = new CartSummary(platformClient, cart.summary);
  }

  /**
   * Add a credit card payment method to a cart.
   *
   * @async
   * @category Checkout & Payment
   * @public
   * @returns Promise containing the updated cart
   */
  async addCardPaymentMethod(
    details:
      | {
          card: {
            name: string;
            number: string;
            cvv: string;
            exp_month: number;
            exp_year: number;
          };
        }
      | { token: string },
    opts?: { select?: boolean }
  ): Promise<Cart> {
    const token = await this.tokenizeCardDetails(details);
    const response = await this.platformClient.request(
      graph.addCardPaymentMethodMutation,
      {
        id: this.id,
        token,
        select: opts?.select == false ? false : true
      }
    );
    return this.refresh(response.addCartCardPaymentMethod.cart);
  }

  private async tokenizeCardDetails(
    details:
      | {
          card: {
            name: string;
            number: string;
            cvv: string;
            exp_month: number;
            exp_year: number;
          };
        }
      | { token: string }
  ) {
    if ("token" in details) {
      return details.token;
    } else {
      const response = await fetch(
        this.platformTarget == PlatformTarget.Sandbox
          ? "https://pci.staging-boulevard.app/cards/tokenize"
          : "https://pci.boulevard.app/cards/tokenize",
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
      return token;
    }
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
    const input: Graph.AddCartSelectedBookableItemInput = {
      id: this.id,
      itemId: item.id,
      itemDiscountCode: opts?.discountCode,
      itemGuestId: opts?.guest?.id,
      itemOptionIds: opts?.options?.map(option => option.id),
      itemStaffVariantId: opts?.staffVariant?.id
    };
    const response = await this.platformClient.request(
      graph.addBookableItemMutation,
      { input }
    );

    return this.refresh(response.addCartSelectedBookableItem.cart);
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
    const input: Graph.AddCartSelectedGiftCardItemInput = {
      id: this.id,
      itemId: item.id,
      itemPrice: price
    };
    const response = await this.platformClient.request(
      graph.addGiftCardItemMutation,
      { input }
    );

    return this.refresh(response.addCartSelectedGiftCardItem.cart);
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
    const input: Graph.AddCartSelectedPurchasableItemInput = {
      id: this.id,
      itemId: item.id,
      itemDiscountCode: opts?.discountCode
    };
    const response = await this.platformClient.request(
      graph.addPurchasableItemMutation,
      { input }
    );

    return this.refresh(response.addCartSelectedPurchasableItem.cart);
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
   */
  async checkout(): Promise<Cart> {
    const input: Graph.CheckoutCartInput = {
      id: this.id
    };
    const response = await this.platformClient.request(
      graph.checkoutCartMutation,
      {
        input
      }
    );

    return this.refresh(response.checkoutCart.cart);
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
   */
  async createGiftCardItemEmailFulfillment(
    item: CartGiftCardItem,
    sender: string,
    deliveryDate: Scalars["Date"],
    recipient: { email: Scalars["Email"]; name: string },
    opts?: { message?: string }
  ): Promise<{ cart: Cart; emailFulfillment: CartItemEmailFulfillment }> {
    const input: Graph.CreateCartGiftCardItemEmailFulfillmentInput = {
      id: this.id,
      itemId: item.id,
      deliveryDate,
      messageFromSender: opts?.message,
      recipientEmail: recipient.email,
      recipientName: recipient.name,
      senderName: sender
    };
    const response = await this.platformClient.request(
      graph.createCartGiftCardItemEmailFulfillmentMutation,
      { input }
    );

    return {
      cart: this.refresh(response.createCartGiftCardItemEmailFulfillment.cart),
      emailFulfillment: new CartItemEmailFulfillment(
        this.platformClient,
        response.createCartGiftCardItemEmailFulfillment.emailFulfillment
      )
    };
  }

  /**
   * Add a guest to a cart.
   *
   * @async
   * @category Guests
   * @public
   */
  async createGuest(opts: {
    email?: Scalars["Email"];
    firstName?: Scalars["String"];
    lastName?: Scalars["String"];
    phoneNumber?: Scalars["PhoneNumber"];
  }): Promise<{ cart: Cart; guest: CartGuest }> {
    const input: Graph.CreateCartGuestInput = {
      id: this.id,
      ...opts
    };

    const response = await this.platformClient.request(
      graph.createGuestMutation,
      {
        input
      }
    );

    return {
      cart: this.refresh(response.createGuest.cart),
      guest: new CartGuest(this.platformClient, response.createGuest.guest)
    };
  }

  /**
   * Delete a gift card item email fulfillment.
   *
   * @async
   * @category Gift Cards
   * @public
   * @param item The CartGiftCardItem.
   * @returns Promise containing the updated cart
   */
  async deleteGiftCardItemEmailFulfillment(
    item: CartGiftCardItem
  ): Promise<Cart> {
    const input: Graph.DeleteCartGiftCardItemEmailFulfillmentInput = {
      id: this.id,
      itemId: item.id
    };

    const response = await this.platformClient.request(
      graph.deleteCartGiftCardItemEmailFulfillmentMutation,
      {
        input
      }
    );

    return this.refresh(response.deleteCartGiftCardItemEmailFulfillment.cart);
  }

  /**
   * Delete a cart's guest. Using this invalidates existing reservations.
   *
   * @async
   * @category Guests
   * @public
   * @returns Promise containing the updated cart
   */
  async deleteGuest(guest: CartGuest): Promise<Cart> {
    const input: Graph.DeleteCartGuestInput = {
      id: this.id,
      guestId: guest.id
    };

    const response = await this.platformClient.request(
      graph.deleteGuestMutation,
      {
        input
      }
    );

    return this.refresh(response.deleteGuest.cart);
  }

  /**
   * Categories of items available to be checked out.
   *
   * Note that this list updates as the cart changes. For instance, some
   * incompatible items may be disabled after others are added to the cart.
   *
   * Clients should retrieve this list again after mutations or make sure errors
   * are handled when items cannot be added.
   *
   * @async
   * @public
   * @returns Promise containing the list of available categories
   */
  async getAvailableCategories(): Promise<Array<CartAvailableCategory>> {
    const response = await this.platformClient.request(
      graph.availableCategoriesQuery
    );

    return response.cart.availableCategories.map(
      category => new CartAvailableCategory(this.platformClient, category)
    );
  }

  /**
   * Payment methods available for this cart. Some methods may already be
   * present, for instance when the current user is authenticated. Additional
   * methods can be added using the `addCart...PaymentMethod` mutations.
   *
   * Note that not all of these payment methods can be used with every cart item.
   * Subsets of supported payment methods are available through the item objects
   * instead.
   */
  async getAvailablePaymentMethods(): Promise<Array<CartItemPaymentMethod>> {
    const response = await this.platformClient.request(
      graph.availablePaymentMethodsQuery
    );

    return response.cart.availablePaymentMethods.map(
      category => new CartItemPaymentMethod(this.platformClient, category)
    );
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
   */
  async getBookableDates(opts: {
    searchRangeLower?: Scalars["Date"];
    searchRangeUpper?: Scalars["Date"];
    timezone?: string;
  }): Promise<Array<CartBookableDate>> {
    const response = await this.platformClient.request(graph.datesQuery, {
      id: this.id,
      searchRangeLower: opts.searchRangeLower,
      searchRangeUpper: opts.searchRangeUpper,
      tz: opts?.timezone || this.timezone
    });

    return response.cartBookableDates.map(
      date => new CartBookableDate(this.platformClient, date)
    );
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
   */
  async getBookableStaffVariants(
    time: CartBookableTime,
    item: CartBookableItem
  ): Promise<Array<CartAvailableBookableItemStaffVariant>> {
    const response = await this.platformClient.request(
      graph.bookableStaffVariantsQuery,
      { id: this.id, itemId: item.id, bookableTimeId: time.id }
    );

    return response.cart.cartBookableStaffVariants.map(
      category =>
        new CartAvailableBookableItemStaffVariant(this.platformClient, category)
    );
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
    const response = await this.platformClient.request(graph.timesQuery, {
      id: this.id,
      searchDate: date,
      tz: opts?.timezone || this.timezone
    });

    return response.cartBookableTimes.map(
      time => new CartBookableTime(this.platformClient, time)
    );
  }

  /**
   * Features available to the cart.
   */
  async getFeatures(): Promise<CartFeatures> {
    const response = await this.platformClient.request(graph.featuresQuery, {
      id: this.id
    });

    return new CartFeatures(this.platformClient, response.cart.features);
  }

  /**
   * A list of guests added to the cart
   * @async
   * @category Guests
   *
   * */
  async getGuests(): Promise<Array<CartGuest>> {
    const response = await this.platformClient.request(graph.guestsQuery, {
      id: this.id
    });

    return response.cart.guests.map(
      guest => new CartGuest(this.platformClient, guest)
    );
  }

  /**
   * Location associated with the cart
   */
  async getLocation(): Promise<Location> {
    const response = await this.platformClient.request(graph.locationQuery, {
      id: this.id
    });

    return new Location(this.platformClient, response.cart.location);
  }

  /**
   * A list of offers applied to the cart.
   *
   * Offers can be applied manually using `addCartOffer` and an offer code, but
   * it's also possible for offers to be auto-applied. At this time auto-applied
   * offers cannot be removed from the cart.
   */
  async getOffers(): Promise<Array<CartOffer>> {
    const response = await this.platformClient.request(graph.offersQuery, {
      id: this.id
    });

    return response.cart.offers.map(
      guest => new CartOffer(this.platformClient, guest)
    );
  }

  /**
   * All selected items pending checkout.
   *
   * Note that the ordering of this list is not stable, and may change depending
   * on the current state of the cart.
   */
  async getSelectedItems(): Promise<Array<CartItem>> {
    const response = await this.platformClient.request(
      graph.selectedItemsQuery,
      {
        id: this.id
      }
    );

    return response.cart.selectedItems.map(
      (
        item:
          | Graph.CartBookableItem
          | Graph.CartGiftCardItem
          | Graph.CartPurchasableItem
      ) => {
        switch (item.__typename) {
          case "CartBookableItem":
            return new CartBookableItem(this.platformClient, item);
          case "CartGiftCardItem":
            return new CartGiftCardItem(this.platformClient, item);
          case "CartPurchasableItem":
            return new CartPurchasableItem(this.platformClient, item);
        }
      }
    );
  }

  /**
   * Remove an offer from the cart.
   *
   * @async
   * @category Offers
   * @param offer The Offer code
   * @public
   * @returns Promise containing the updated cart
   */
  async removeOffer(offer: CartOffer): Promise<Cart> {
    const input: Graph.RemoveCartOfferInput = {
      id: this.id,
      offerId: offer.id
    };

    const response = await this.platformClient.request(
      graph.removeOfferMutation,
      {
        input
      }
    );

    return this.refresh(response.removeOffer.cart);
  }

  /**
   * Remove a selected item from a cart. Using this invalidates existing reservations when the item being removed is a bookable item.
   *
   * @async
   * @public
   * @returns Promise containing the updated cart
   */
  async removeSelectedItem(
    item: CartBookableItem | CartGiftCardItem | CartPurchasableItem
  ): Promise<Cart> {
    const input: Graph.RemoveCartSelectedItemInput = {
      id: this.id,
      itemId: item.id
    };

    const response = await this.platformClient.request(
      graph.removeSelectedItemMutation,
      { input }
    );

    return this.refresh(response.removeSelectedItem.cart);
  }

  /**
   * Reserve one starting time for bookable cart items, i.e. all bookable items are to be performed starting at this time.
   * Note that this call may fail if the time is no longer available.
   *
   * @async
   * @category Bookable Items
   * @public
   * @returns Promise containing the updated cart
   */
  async reserveBookableItems(bookableTime: CartBookableTime): Promise<Cart> {
    const input: Graph.ReserveCartBookableItemsInput = {
      id: this.id,
      bookableTimeId: bookableTime.id
    };
    const response = await this.platformClient.request(
      graph.reserveCartMutation,
      {
        input
      }
    );

    return this.refresh(response.reserveCart.cart);
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
   */
  async selectPaymentMethod(
    paymentMethod: CartItemPaymentMethod
  ): Promise<Cart> {
    const input: Graph.SelectCartPaymentMethodInput = {
      id: this.id,
      paymentMethodId: paymentMethod.id
    };
    const response = await this.platformClient.request(
      graph.selectPaymentMethodMutation,
      { input }
    );

    return this.refresh(response.selectPaymentMethod.cart);
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
    const input: Graph.TakeCartOwnershipInput = {
      id: this.id
    };
    const response = await this.platformClient.request(
      graph.takeOwnershipMutation,
      {
        input
      }
    );

    return this.refresh(response.takeCartOwnership.cart);
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
    const input: Graph.UpdateCartInput = {
      id: this.id,
      ...opts
    };
    const response = await this.platformClient.request(
      graph.updateCartMutation,
      {
        input
      }
    );

    return this.refresh(response.takeCartOwnership.cart);
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
   */
  async updateGiftCardItemEmailFulfillment(
    item: CartGiftCardItem,
    opts?: {
      deliveryDate?: Scalars["Date"];
      message?: string;
      recipient: { email?: Scalars["Email"]; name?: string };
      sender?: { name?: string };
    }
  ): Promise<{ cart: Cart; emailFulfillment: CartItemEmailFulfillment }> {
    const input: Graph.UpdateCartGiftCardItemEmailFulfillmentInput = {
      id: this.id,
      itemId: item.id,
      deliveryDate: opts.deliveryDate,
      messageFromSender: opts?.message,
      recipientEmail: opts?.recipient.email,
      recipientName: opts?.recipient.name,
      senderName: opts?.sender?.name
    };
    const response = await this.platformClient.request(
      graph.updateCartGiftCardItemEmailFulfillmentMutation,
      { input }
    );

    return {
      cart: this.refresh(response.updateCartGiftCardItemEmailFulfillment.cart),
      emailFulfillment: new CartItemEmailFulfillment(
        this.platformClient,
        response.updateCartGiftCardItemEmailFulfillment.emailFulfillment
      )
    };
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
  ): Promise<{ cart: Cart; guest: CartGuest }> {
    const input: Graph.UpdateCartGuestInput = {
      id: this.id,
      guestId: guest.id,
      ...opts
    };

    const response = await this.platformClient.request(
      graph.updateGuestMutation,
      {
        input
      }
    );

    return {
      cart: this.refresh(response.updateGuest.cart),
      guest: new CartGuest(this.platformClient, response.updateGuest.guest)
    };
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
    item: Graph.CartBookableItem,
    opts?: {
      discountCode?: string;
      guest?: CartGuest;
      options?: Array<CartAvailableBookableItemOption>;
      staffVariant?: CartAvailableBookableItemStaffVariant;
    }
  ): Promise<Cart> {
    const input: Graph.UpdateCartSelectedBookableItemInput = {
      id: this.id,
      itemId: item.id,
      ...opts
    };

    const response = await this.platformClient.request(
      graph.updateSelectedBookableItemMutation,
      {
        input
      }
    );

    return this.refresh(response.updateSelectedBookableItem.cart);
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
    item: Graph.CartGiftCardItem,
    opts?: {
      design?: Graph.GiftCardDesign;
      price?: Scalars["Money"];
    }
  ): Promise<Cart> {
    const input: Graph.UpdateCartSelectedGiftCardItemInput = {
      id: this.id,
      itemId: item.id,
      ...opts
    };

    const response = await this.platformClient.request(
      graph.updateSelectedGiftCardItemMutation,
      {
        input
      }
    );

    return this.refresh(response.updateSelectedGiftCardItem.cart);
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
    item: Graph.CartPurchasableItem,
    opts?: {
      discountCode?: string;
    }
  ): Promise<Cart> {
    const input: Graph.UpdateCartSelectedPurchasableItemInput = {
      id: this.id,
      itemId: item.id,
      ...opts
    };

    const response = await this.platformClient.request(
      graph.updateSelectedPurchasableItemMutation,
      {
        input
      }
    );

    return this.refresh(response.updateSelectedPurchasableItem.cart);
  }

  private refresh(newCart) {
    return new Cart(this.platformClient, newCart, this.platformTarget);
  }
}

export {
  Cart,
  CartAdvanceGratuity,
  CartAvailableBookableItemStaffVariant,
  CartAvailableCategory,
  CartBookableDate,
  CartBookableTime,
  CartClientInformation,
  CartError,
  CartErrorCode,
  CartItemEmailFulfillment,
  CartItemPaymentMethod,
  CartSummary,
  DepositType
};
export * from "./carts/guests";
export * from "./carts/items";
