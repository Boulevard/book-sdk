import { Scalars, Maybe } from "../graph";
import { CartItemErrorCode } from "../graph";
import * as Graph from "../graph";
import { CartGuest } from "./guests";
import { PlatformClient } from "../platformClient";
import { Staff } from "../staff";

/** Abstract available item that can be checked out. */
class CartAvailableItem {
  /** Short optional description. */
  description: Maybe<Scalars["String"]>;

  /** Whether the item should appear disabled or hidden. */
  disabled: Scalars["Boolean"];

  /** Message detailing why `disabled` is set. Might not be available. */
  disabledDescription: Maybe<Scalars["String"]>;

  /** ID of the item. */
  id: Scalars["ID"];

  /**
   * Displayed price range of the item before tax.
   *
   * The final price may differ based on customizations made to the item before
   * checking out. For instance, bookable items may have variants and options
   * that can be chosen and affect the price.
   */
  listPriceRange: CartPriceRange;

  /** Short human-readable name. */
  name: Scalars["String"];

  /**
   * @internal
   */
  constructor(item: Graph.CartAvailableItem) {
    Object.assign(this, item);
  }
}

/** Cart item payment method. */
class CartItemPaymentMethod {
  /** ID of the method. */
  id: Scalars["ID"];

  /** Short human-readable name. */
  name: Scalars["String"];

  /**
   * @internal
   */
  constructor(method: Graph.CartItemPaymentMethod) {
    Object.assign(this, method);
  }
}

/** Abstract item added using the `addCart...Item` mutations. */
class CartItem {
  /** Total discount amount on the price. */
  discountAmount: Scalars["Money"];

  /**
   * Valid discount code that was applied, either the cart's code or one that was
   * applied separately to the item. An invalid code results in a `null` value.
   */
  discountCode: Maybe<Scalars["String"]>;

  /** Current item validation errors. */
  errors: Array<Graph.CartItemError>;

  /** ID of the item. */
  id: Scalars["ID"];

  /** Original item details. */
  item: CartAvailableItem;

  /** Total for the item after discounts and taxes. */
  lineTotal: Scalars["Money"];

  /** Price before discounts and taxes. */
  price: Scalars["Money"];

  /** Total tax amount on the discounted price. */
  taxAmount: Scalars["Money"];

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
  async getSelectedPaymentMethod(): Promise<Maybe<CartItemPaymentMethod>> {
    return undefined;
  }
}

/** Send the item to a recipient via email. */
class CartItemEmailFulfillment {
  /** Optionally specify a delivery date for the email. */
  deliveryDate: Maybe<Scalars["Date"]>;

  id: Scalars["ID"];

  /** Optionally include a message from the sender to the recipient. */
  messageFromSender: Maybe<Scalars["String"]>;

  /** The email the item should be sent to. */
  recipientEmail: Scalars["Email"];

  /** The name of the person receiving the item. */
  recipientName: Scalars["String"];

  /** The name of the person sending the item. */
  senderName: Scalars["String"];

  /**
   * @internal
   */
  constructor(fulfilment: Graph.CartItemEmailFulfillment) {
    Object.assign(this, fulfilment);
  }
}

/** Cart item validation error. */
type CartItemError = {
  /** Machine-readable code. */
  code: CartItemErrorCode;

  /** Detailed geek-readable description. */
  description: Scalars["String"];

  /** Short human-readable message. */
  message: Scalars["String"];
};

/** Item that can be booked through `addCartBookableItem`. */
class CartAvailableBookableItem extends CartAvailableItem {
  /**
   * Groups of available options for modifying the booked service. These can be
   * used to modify the booked item and may affect pricing and timing.
   */
  optionGroups: Array<CartAvailableBookableItemOptionGroup>;
  /**
   * List of optional staff variants that can be chosen. Variants may have
   * different pricing and timing.
   *
   * When there’s no preference, the first one available is assigned based on the
   * selected time. The business can also enforce this, in which case this list
   * is empty.
   */
  staffVariants: Array<CartAvailableBookableItemStaffVariant>;
}

/**
 * Option group of a bookable item with optional limits.
 *
 * Option groups have their own validation requirements which are validated when
 * the bookable item is added. An error is returned if the selections don’t meet
 * those requirements.
 */
type CartAvailableBookableItemOptionGroup = {
  /** Short optional description. */
  description: Maybe<Scalars["String"]>;

  /** ID of the option group. */
  id: Scalars["ID"];

  /** Optional maximum number of options that can be selected. */
  maxLimit: Maybe<Scalars["Int"]>;

  /** Optional minimum number of options that must be selected. */
  minLimit: Maybe<Scalars["Int"]>;

  /** Short human-readable name. */
  name: Scalars["String"];

  /** List of selectable options. */
  options: Array<CartAvailableBookableItemOption>;
};

/** Option of a bookable item that can be selected. */
type CartAvailableBookableItemOption = {
  /** Short optional description. */
  description: Maybe<Scalars["String"]>;

  /** Minutes added to duration when selected. */
  durationDelta: Scalars["Int"];

  /** Group ID of the option. */
  groupId: Scalars["ID"];

  /** ID of the option. */
  id: Scalars["ID"];

  /** Short human-readable name. */
  name: Scalars["String"];

  /** Amount added to price when selected. */
  priceDelta: Scalars["Money"];
};

/** Gift card that can be purchased through `addCartSelectedGiftCardItem`. */
class CartAvailableGiftCardItem extends CartAvailableItem {
  /** When true the user may enter a custom amount between the min and max price range. */
  allowCustomAmounts: Scalars["Boolean"];

  /** The maximum available price for which to purchase the gift card. */
  giftCardMax: Scalars["Money"];

  /** The minimum available price for which to purchase the gift card. */
  giftCardMin: Scalars["Money"];

  /** The available preset prices for which to purchase the gift card. */
  pricePresets: Array<Scalars["Money"]>;
}

/** Item that can be purchased through `addCartPurchasableItem`. */
class CartAvailablePurchasableItem extends CartAvailableItem {}

/** An item that can be booked at a certain time. */
class CartBookableItem extends CartItem {
  /**
   * Guest associated with this item.
   *
   * A null value implies the default guest, i.e. the booking client.
   */
  guest: Maybe<CartGuest>;

  /**
   * ID of the guest associated with this item.
   *
   * A null value implies the default guest, i.e. the booking client.
   *
   * This field is more efficient than `guest` when only the ID is required.
   */
  guestId: Maybe<Scalars["ID"]>;

  /** Any selected options for the item. */
  selectedOptions: Array<CartAvailableBookableItemOption>;

  /**
   * Selected staff variant for the item.
   *
   * You can set the preferred variant when adding the item. Leaving the variant
   * unset indicates no preference.
   *
   * Once a time is reserved, a variant is automatically set if none was set
   * earlier. Once the reservation expires, any automatically set value reverts
   * back to `null`.
   */
  selectedStaffVariant: Maybe<CartAvailableBookableItemStaffVariant>;

  /**
   * Selected starting time for the item.
   *
   * This value is reserved temporarily. Once the reservation expires, the value
   * reverts to `null` and needs to be selected again. See the parent cart’s
   * `expiresAt` field for more information.
   */
  startTime: Maybe<Scalars["NaiveDateTime"]>;
}

/** Staff variant of a bookable item. */
class CartAvailableBookableItemStaffVariant {
  /** Duration of the variant in minutes. */
  duration: Scalars["Int"];

  /** ID of the variant. */
  id: Scalars["ID"];

  /** Price of the variant before discounts and taxes. */
  price: Scalars["Money"];

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

/** Specified design for a CartItemEmailFulfillment. */
type CartItemGiftCardDesign = {
  backgroundColor: Maybe<Scalars["String"]>;
  foregroundText: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  image: Maybe<Scalars["String"]>;
};

/** A gift card item that can be purchased. */
class CartGiftCardItem extends CartItem {
  /** Send the gift card to a recipient via email. */
  emailFulfillment: Maybe<CartItemEmailFulfillment>;
  giftCardDesign: Maybe<CartItemGiftCardDesign>;
}

/** Displayed price range of an item, before tax. */
type CartPriceRange = {
  /** Maximum price. */
  max: Scalars["Money"];

  /** Minimum price. */
  min: Scalars["Money"];

  /** Whether the price is variable, i.e. the minimum and maximum differ. */
  variable: Scalars["Boolean"];
};

/** An item that can be purchased. */
class CartPurchasableItem extends CartItem {}

export {
  CartAvailableBookableItem,
  CartAvailableBookableItemOption,
  CartAvailableBookableItemOptionGroup,
  CartAvailableBookableItemStaffVariant,
  CartAvailableGiftCardItem,
  CartAvailablePurchasableItem,
  CartAvailableItem,
  CartItemEmailFulfillment,
  CartItemPaymentMethod,
  CartItem,
  CartItemError,
  CartItemGiftCardDesign,
  CartGiftCardItem,
  CartBookableItem,
  CartPriceRange,
  CartPurchasableItem
};