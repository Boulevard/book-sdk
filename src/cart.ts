import * as graph from "./carts/graph";
import { PlatformClient } from "./platformClient";
import * as Graph from "./graph";
import { Staff } from "./staff";
import { Location } from "./locations";

/** Staff variant of a bookable item. */
class CartAvailableBookableItemStaffVariant {
  /** Duration of the variant in minutes. */
  duration: Graph.Scalars["Int"];

  /** ID of the variant. */
  id: Graph.Scalars["ID"];

  /** Price of the variant before discounts and taxes. */
  price: Graph.Scalars["Money"];

  /** Staff member booked. */
  staff: Staff;

  /**
   * @internal
   */
  constructor(variant: Graph.CartAvailableBookableItemStaffVariant) {
    Object.assign(this, variant);
    this.staff = new Staff(variant.staff);
  }
}

/** Category of items that can be checked out. */
class CartAvailableCategory {
  /**
   * Items available to be checked out.
   *
   * Note that this list updates as the cart changes. For instance, incompatible
   * items may be disabled after others are added to the cart. Clients should
   * retrieve this list again after mutations or make sure errors are handled
   * when items cannot be added.
   */
  availableItems: Array<CartAvailableItem>;

  /** Short optional description. */
  description: Graph.Maybe<Graph.Scalars["String"]>;

  /** Whether the category should appear as disabled. */
  disabled: Graph.Scalars["Boolean"];

  /** Message detailing why `disabled` is set. Might not be available. */
  disabledDescription: Graph.Maybe<Graph.Scalars["String"]>;

  /** Short human-readable name. */
  name: Graph.Scalars["String"];

  /**
   * @internal
   */
  constructor(
    private platformClient: PlatformClient,
    category: Graph.CartAvailableCategory
  ) {
    Object.assign(this, category);
    // TODO: Fetch and isntantiate CartAvailableItems
  }
}

/** Abstract available item that can be checked out. */
class CartAvailableItem {
  /** Short optional description. */
  description: Graph.Maybe<Graph.Scalars["String"]>;

  /** Whether the item should appear disabled or hidden. */
  disabled: Graph.Scalars["Boolean"];

  /** Message detailing why `disabled` is set. Might not be available. */
  disabledDescription?: Graph.Maybe<Graph.Scalars["String"]>;

  /** ID of the item. */
  id: Graph.Scalars["ID"];

  /**
   * Displayed price range of the item before tax.
   *
   * The final price may differ based on customizations made to the item before
   * checking out. For instance, bookable items may have variants and options
   * that can be chosen and affect the price.
   */
  listPriceRange: Graph.CartPriceRange;

  /** Short human-readable name. */
  name: Graph.Scalars["String"];

  /**
   * @internal
   */
  constructor(item: Graph.CartAvailableItem) {
    Object.assign(this, item);
    // TODO Handle implementations of this interface
  }
}

/** Available starting date for bookable items in a cart. */
class CartBookableDate {
  /**
   * Available date for the bookable items.
   *
   * Note that this date may differ from the one at the location when a specific
   * time zone is requested using the `tz` argument. The date uses the requested
   * time zone, or the location's time zone when `tz` is null.
   */
  date: Graph.Scalars["Date"];

  /**
   * @internal
   */
  constructor(date: Graph.CartBookableDate) {
    Object.assign(this, date);
  }
}

/** Available starting time for bookable items in a cart. */
class CartBookableTime {
  /** ID of this particular time. */
  id: Graph.Scalars["ID"];

  /** Available start time for the earliest bookable item. */
  startTime: Graph.Scalars["DateTime"];

  /**
   * @internal
   */
  constructor(time: Graph.CartBookableTime) {
    Object.assign(this, time);
  }
}

/** Features available to the cart. */
class CartFeatures {
  /** Whether gift cards are available to be purchased in this cart. */
  giftCardPurchaseEnabled: Graph.Scalars["Boolean"];

  /** Whether payment info is required to check out services in this cart. */
  paymentInfoRequired: Graph.Scalars["Boolean"];

  /**
   * @internal
   */
  constructor(features: Graph.CartFeatures) {
    Object.assign(this, features);
  }
}

/** Abstract item added using the `addCart...Item` mutations. */
class CartItem {
  /** Total discount amount on the price. */
  discountAmount: Graph.Scalars["Money"];

  /**
   * Valid discount code that was applied, either the cart's code or one that was
   * applied separately to the item. An invalid code results in a `null` value.
   */
  discountCode?: Graph.Maybe<Graph.Scalars["String"]>;

  /** Current item validation errors. */
  errors: Array<Graph.CartItemError>;

  /** ID of the item. */
  id: Graph.Scalars["ID"];

  /** Original item details. */
  item: CartAvailableItem;

  /** Total for the item after discounts and taxes. */
  lineTotal: Graph.Scalars["Money"];

  /** Price before discounts and taxes. */
  price: Graph.Scalars["Money"];

  /** Total tax amount on the discounted price. */
  taxAmount: Graph.Scalars["Money"];

  constructor(
    private platformClient: PlatformClient,
    cartItem: Graph.CartItem
  ) {
    Object.assign(this, cartItem);
    this.item = new CartAvailableItem(cartItem.item);
  }

  /** Payment methods available for this item.
   * @todo implement
   */
  async getAvailablePaymentMethods() {
    return undefined;
  }

  /** Payment method selected for this item.
   * @todo implement
   */
  async getSelectedPaymentMethod(): Promise<
    Graph.Maybe<CartItemPaymentMethod>
  > {
    return undefined;
  }
}

/** Send the item to a recipient via email. */
class CartItemEmailFulfillment {
  /** Optionally specify a delivery date for the email. */
  deliveryDate: Graph.Maybe<Graph.Scalars["Date"]>;

  id: Graph.Scalars["ID"];

  /** Optionally include a message from the sender to the recipient. */
  messageFromSender: Graph.Maybe<Graph.Scalars["String"]>;

  /** The email the item should be sent to. */
  recipientEmail: Graph.Scalars["Email"];

  /** The name of the person receiving the item. */
  recipientName: Graph.Scalars["String"];

  /** The name of the person sending the item. */
  senderName: Graph.Scalars["String"];

  /**
   * @internal
   */
  constructor(fulfilment: Graph.CartItemEmailFulfillment) {
    Object.assign(this, fulfilment);
  }
}

/** Cart item payment method. */
class CartItemPaymentMethod {
  /** ID of the method. */
  id: Graph.Scalars["ID"];

  /** Short human-readable name. */
  name: Graph.Scalars["String"];

  /**
   * @internal
   */
  constructor(method: Graph.CartItemPaymentMethod) {
    Object.assign(this, method);
    // TODO: Handle interface implementations?
  }
}

/** A guest that can be associated with a bookable item. */
class CartGuest {
  /** Email address, if provided. */
  email: Graph.Maybe<Graph.Scalars["Email"]>;

  /** First name, if provided. */
  firstName: Graph.Maybe<Graph.Scalars["String"]>;

  /** ID of the guest. */
  id: Graph.Scalars["ID"];

  /**
   * Name of the guest if provided, otherwise a user-friendly fallback name that
   * uniquely identifies the guest.
   */
  label: Graph.Scalars["String"];

  /** Last name, if provided. */
  lastName: Graph.Maybe<Graph.Scalars["String"]>;

  /**
   * Positive ordinal number starting at 1.
   *
   * This is for display purposes, don't use this to uniquely identify guests.
   * Use the `id` field for that instead. Also, don't assume this scheme follows
   * any predefined ordering.
   */
  number: Graph.Scalars["Int"];

  /** Mobile phone, if provided. */
  phoneNumber: Graph.Maybe<Graph.Scalars["PhoneNumber"]>;

  /**
   * @internal
   */
  constructor(guest: Graph.CartGuest) {
    Object.assign(this, guest);
  }
}

/** Offer added to a cart, see the `offers` field. */
class CartOffer {
  /**
   * Whether this offer is applied to any items currently in the cart.
   *
   * Offers that are not applicable are still valid (i.e. they exist and can be
   * used) but there are no items in the current cart that could be affected.
   * When applicable items are added later, the offer is applied then.
   */
  applied: Graph.Scalars["Boolean"];

  /** Case-insensitive, uniquely identifying code. */
  code: Graph.Scalars["String"];

  /** ID of the offer. */
  id: Graph.Scalars["ID"];

  /** Human-readable name. */
  name: Graph.Scalars["String"];

  /**
   * @internal
   */
  constructor(offer: Graph.CartOffer) {
    Object.assign(this, offer);
  }
}

/** Summary of the cart, including e.g. line item totals. */
class CartSummary {
  deposit: Graph.DepositType;

  /** Total required deposit amount. */
  depositAmount: Graph.Scalars["Money"];

  /** Total discount amount on the subtotal. */
  discountAmount: Graph.Scalars["Money"];

  /** Total gratuity amount on the subtotal. */
  gratuityAmount: Graph.Scalars["Money"];

  /** Whether a payment method is required */
  paymentMethodRequired: Graph.Scalars["Boolean"];

  /** Rounding amount on the discounted and taxed subtotal. */
  roundingAmount: Graph.Scalars["Money"];

  /** Subtotal before gratuity, discounts, taxes, and rounding. */
  subtotal: Graph.Scalars["Money"];

  /** Total tax amount on the discounted subtotal. */
  taxAmount: Graph.Scalars["Money"];

  /** Total after gratuity, discounts, taxes, and rounding. */
  total: Graph.Scalars["Money"];

  /**
   * @internal
   */
  constructor(cartSummary: Graph.CartSummary) {
    Object.assign(this, cartSummary);
  }
}

class Cart {
  /** Optional gratuity defined in advance for bookable items. */
  advanceGratuity: Graph.Maybe<Graph.CartAdvanceGratuity>;

  /**
   * Optional client information supplied when checking out on behalf of someone
   * else than the current user.
   */
  clientInformation: Graph.Maybe<Graph.CartClientInformation>;

  /** Optional message from the client to the business. */
  clientMessage: Graph.Maybe<Graph.Scalars["String"]>;

  /**
   * Timestamp of when the cart was completed.
   *
   * This field cannot be edited and once completed cannot be changed.
   */
  completedAt: Graph.Maybe<Graph.Scalars["DateTime"]>;

  /**
   * When the cart has reserved bookable items, the end time of the latest item.
   * This value is `null` when there are no reservations.
   */
  endTime: Graph.Maybe<Graph.Scalars["NaiveDateTime"]>;

  /** Current validation errors. */
  errors: Array<Graph.CartError>;

  /**
   * When the cart has reserved bookable items, the timestamp when reservations
   * (e.g. service time selections) expire and need to be selected again. This
   * value is `null` when there are no reservations and is reset into the future
   * whenever a new reservation is added.
   */
  expiresAt: Graph.Maybe<Graph.Scalars["DateTime"]>;

  /** The ID of an object */
  id: Graph.Scalars["ID"];

  /** Timestamp when the cart was created. */
  insertedAt: Graph.Scalars["DateTime"];

  /**
   * When the cart has reserved bookable items, the starting time of the earliest
   * item. This value is `null` when there are no reservations.
   */
  startTime: Graph.Maybe<Graph.Scalars["NaiveDateTime"]>;

  /** Summary of the cart, including e.g. line item totals. */
  summary: CartSummary;

  /** Timestamp when the cart was last updated. */
  updatedAt: Graph.Scalars["DateTime"];

  /**
   * @internal
   */
  private timezone: string;

  /**
   * @internal
   */
  private paymentToken?: string;

  /**
   * @internal
   */
  constructor(
    private platformClient: PlatformClient,
    cart: Graph.Cart,
    opts?: { timezone?: string }
  ) {
    this.timezone =
      opts?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    Object.assign(this, cart);
    this.summary = new CartSummary(cart.summary);
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
    await this.platformClient.request(graph.addCardPaymentMethodMutation, {
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
    item: Graph.CartBookableItem,
    opts?: {
      discountCode?: string;
      guest?: CartGuest;
      options?: Array<Graph.CartAvailableBookableItemOption>;
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

    return new Cart(
      this.platformClient,
      response.addCartSelectedBookableItem.cart
    );
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
    item: Graph.CartGiftCardItem,
    price: Graph.Scalars["Money"]
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

    return new Cart(
      this.platformClient,
      response.addCartSelectedGiftCardItem.cart
    );
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
    item: Graph.CartPurchasableItem,
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

    return new Cart(
      this.platformClient,
      response.addCartSelectedPurchasableItem.cart
    );
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

    return new Cart(this.platformClient, response.checkoutCart.cart);
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
    item: Graph.CartGiftCardItem,
    sender: string,
    deliveryDate: Graph.Scalars["Date"],
    recipient: { email: Graph.Scalars["Email"]; name: string },
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
      cart: new Cart(
        this.platformClient,
        response.createCartGiftCardItemEmailFulfillment.cart
      ),
      emailFulfillment: new CartItemEmailFulfillment(
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
    email?: Graph.Scalars["Email"];
    firstName?: Graph.Scalars["String"];
    lastName?: Graph.Scalars["String"];
    phoneNumber?: Graph.Scalars["PhoneNumber"];
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
      cart: new Cart(this.platformClient, response.createGuest.cart),
      guest: new CartGuest(response.createGuest.guest)
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
    item: Graph.CartGiftCardItem
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

    return new Cart(
      this.platformClient,
      response.deleteCartGiftCardItemEmailFulfillment.cart
    );
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

    return new Cart(this.platformClient, response.deleteGuest.cart);
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
      category => new CartItemPaymentMethod(category)
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
    searchRangeLower?: Graph.Scalars["Date"];
    searchRangeUpper?: Graph.Scalars["Date"];
    timezone?: string;
  }): Promise<Array<CartBookableDate>> {
    const response = await this.platformClient.request(graph.datesQuery, {
      id: this.id,
      searchRangeLower: opts.searchRangeLower,
      searchRangeUpper: opts.searchRangeUpper,
      tz: opts?.timezone || this.timezone
    });

    return response.cartBookableDates.map(date => new CartBookableDate(date));
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
    item: Graph.CartBookableItem
  ): Promise<Array<CartAvailableBookableItemStaffVariant>> {
    const response = await this.platformClient.request(
      graph.bookableStaffVariantsQuery,
      { id: this.id, itemId: item.id, bookableTimeId: time.id }
    );

    return response.cart.cartBookableStaffVariants.map(
      category => new CartAvailableBookableItemStaffVariant(category)
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
    date: Graph.Scalars["Date"],
    opts?: { timezone?: string }
  ): Promise<Array<CartBookableTime>> {
    const response = await this.platformClient.request(graph.timesQuery, {
      id: this.id,
      searchDate: date,
      tz: opts?.timezone || this.timezone
    });

    return response.cartBookableTimes.map(time => new CartBookableTime(time));
  }

  /**
   * Features available to the cart.
   */
  async getFeatures(): Promise<CartFeatures> {
    const response = await this.platformClient.request(graph.featuresQuery, {
      id: this.id
    });

    return new CartFeatures(response.cart.features);
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

    return response.cart.guests.map(guest => new CartGuest(guest));
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

    return response.cart.offers.map(guest => new CartOffer(guest));
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
      item => new CartItem(this.platformClient, item)
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

    return new Cart(this.platformClient, response.removeOffer.cart);
  }

  /**
   * Remove a selected item from a cart. Using this invalidates existing reservations when the item being removed is a bookable item.
   *
   * @async
   * @public
   * @returns Promise containing the updated cart
   */
  async removeSelectedItem(
    item:
      | Graph.CartBookableItem
      | Graph.CartGiftCardItem
      | Graph.CartPurchasableItem
  ): Promise<Cart> {
    const input: Graph.RemoveCartSelectedItemInput = {
      id: this.id,
      itemId: item.id
    };

    const response = await this.platformClient.request(
      graph.removeSelectedItemMutation,
      { input }
    );

    return new Cart(this.platformClient, response.removeSelectedItem.cart);
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

    return new Cart(this.platformClient, response.reserveCart.cart);
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

    return new Cart(this.platformClient, response.selectPaymentMethod.cart);
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

    return new Cart(this.platformClient, response.takeCartOwnership.cart);
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
    advanceGratuity?: Graph.CartAdvanceGratuityInput;
    clientInformation?: Graph.CartClientInformationInput;
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

    return new Cart(this.platformClient, response.takeCartOwnership.cart);
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
    item: Graph.CartGiftCardItem,
    opts?: {
      deliveryDate?: Graph.Scalars["Date"];
      message?: string;
      recipient: { email?: Graph.Scalars["Email"]; name?: string };
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
      cart: new Cart(
        this.platformClient,
        response.updateCartGiftCardItemEmailFulfillment.cart
      ),
      emailFulfillment: new CartItemEmailFulfillment(
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
      email?: Graph.Scalars["Email"];
      firstName?: string;
      lastName?: string;
      phoneNumber?: Graph.Scalars["PhoneNumber"];
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
      cart: new Cart(this.platformClient, response.updateGuest.cart),
      guest: new CartGuest(response.updateGuest.guest)
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
      options?: Array<Graph.CartAvailableBookableItemOption>;
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

    return new Cart(
      this.platformClient,
      response.updateSelectedBookableItem.cart
    );
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
      price?: Graph.Scalars["Money"];
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

    return new Cart(
      this.platformClient,
      response.updateSelectedGiftCardItem.cart
    );
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

    return new Cart(
      this.platformClient,
      response.updateSelectedPurchasableItem.cart
    );
  }
}

export {
  Cart,
  CartAvailableBookableItemStaffVariant,
  CartBookableDate,
  CartBookableTime,
  CartGuest,
  CartItemEmailFulfillment,
  CartItemPaymentMethod,
  CartSummary
};
