import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Represents a set of geographical coordinates
   *
   */
  Coordinates: any;
  /**
   * The `Date` scalar type represents a timezone agnostic date, formatted as an
   * ISO8601 date string, i.e. `YYYY-MM-DD`.
   *
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a datetime formatted as an ISO8601
   * string.
   *
   */
  DateTime: any;
  /**
   * The `Interval` scalar type represents a time interval, formatted as an
   * ISO8601 duration string.
   *
   */
  DurationInterval: any;
  /**
   * Email address validated as an RFC 5322 addr-spec.
   *
   * See <https://tools.ietf.org/html/rfc5322#section-3.4.1> for more details and
   * <https://tools.ietf.org/html/rfc3696#section-3> for an informational summary.
   *
   */
  Email: any;
  /**
   * Represents an amount of money as an integer of the smallest currency unit.
   *
   * For example, 1 USD is `100` since the cent is the smallest currency unit.
   * Similarly, 1 JPY is `1` because the Japanese yen is a zero-decimal currency.
   * For more information, see the ISO 4217 standard.
   *
   * The applicable currency is specified separately.
   *
   */
  Money: any;
  /**
   * The `NaiveDateTime` scalar type represents a datetime formatted as an ISO 8601
   * string, without an associated time zone.
   *
   */
  NaiveDateTime: any;
  /**
   * The PhoneNumber scalar type represents a phone number formatted following the E.164
   * internationally recognized standard.
   *
   */
  PhoneNumber: any;
  /**
   * A String query is a text search made up of values and comparison operators.
   *
   * Supported value types:
   *
   * - Field name
   * - String
   * - Boolean
   * - Number (float/int)
   * - DateTime - formatted as an ISO 8601 string
   *
   * We also support 'IS NULL' and 'IS NOT NULL' operators.
   *
   * Examples:
   *
   *   "startAt <= '2020-01-01T00:00:00'
   *
   *   "quantity > 0"
   *
   *   "categoryId IS NULL"
   *
   * Comparisons (<value> <op> <value>) can be combined through the 'AND' and 'OR' operators.
   *
   * Examples:
   *
   *   "endAt < '2020-01-01T00:00:00' AND cancelled = true"
   *
   * Create precedence by surrounding comparisons with parenthesis.
   *
   * Note: Strings and field names are case sensitive.
   *
   */
  QueryString: any;
  /**
   * Represents a time zone as a tz database (a.k.a. tzdata, IANA, Olson) time zone
   * name. See <https://en.wikipedia.org/wiki/Tz_database> for more information.
   *
   */
  Tz: any;
};

export type AddCartCardPaymentMethodInput = {
  /** ID of the cart */
  id: Scalars["ID"];
  /**
   * Whether to automatically select this credit card as the payment method
   * for the cart, false by default.
   */
  select?: Maybe<Scalars["Boolean"]>;
  /** Credit card token obtained from the Credit Card Tokenization endpoint. */
  token: Scalars["ID"];
};

export type AddCartCardPaymentMethodPayload = {
  __typename?: "AddCartCardPaymentMethodPayload";
  cart: Cart;
};

export type AddCartOfferInput = {
  /** ID of the cart */
  id: Scalars["ID"];
  /** The offer code identifier */
  offerCode: Scalars["String"];
};

export type AddCartOfferPayload = {
  __typename?: "AddCartOfferPayload";
  cart: Cart;
  offer: CartOffer;
};

export type AddCartSelectedBookableItemInput = {
  /** ID of the cart. */
  id: Scalars["ID"];
  /**
   * Optional discount code applied to the item. Invalid discount codes are
   * ignored without an error, check `discountCode` on the selected item to see
   * if the code was valid.
   */
  itemDiscountCode?: Maybe<Scalars["String"]>;
  /**
   * Optional ID that identifies the guest this item is booked for. A null
   * value indicates the cart owner, or current client.
   *
   * When finding available times for bookable items, it's assumed that two
   * items having different guests can be booked simultaneously.
   */
  itemGuestId?: Maybe<Scalars["ID"]>;
  /** ID of the bookable item. */
  itemId: Scalars["ID"];
  /**
   * Optional IDs of selected bookable item options. Note that the selections
   * must conform to the option group requirements, e.g. limits on the number
   * of options. Otherwise an error is returned.
   */
  itemOptionIds?: Maybe<Array<Scalars["ID"]>>;
  /** Optional ID of the selected bookable item staff variant. */
  itemStaffVariantId?: Maybe<Scalars["ID"]>;
};

export type AddCartSelectedBookableItemPayload = {
  __typename?: "AddCartSelectedBookableItemPayload";
  cart: Cart;
};

export type AddCartSelectedGiftCardItemInput = {
  /** ID of the cart. */
  id: Scalars["ID"];
  /** ID of the gift card item. */
  itemId: Scalars["ID"];
  /**
   * Price applied to the gift card item. See cartAvailableGiftCardItem.minPrice
   * and maxPrice for limits
   */
  itemPrice: Scalars["Money"];
};

export type AddCartSelectedGiftCardItemPayload = {
  __typename?: "AddCartSelectedGiftCardItemPayload";
  cart: Cart;
};

export type AddCartSelectedPurchasableItemInput = {
  /** ID of the cart. */
  id: Scalars["ID"];
  /**
   * Optional discount code applied to the item. Invalid discount codes are
   * ignored without an error, check `discountCode` on the selected item to see
   * if the code was valid.
   */
  itemDiscountCode?: Maybe<Scalars["String"]>;
  /** ID of the purchasable item. */
  itemId: Scalars["ID"];
};

export type AddCartSelectedPurchasableItemPayload = {
  __typename?: "AddCartSelectedPurchasableItemPayload";
  cart: Cart;
};

export type Address = {
  __typename?: "Address";
  city?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  line1?: Maybe<Scalars["String"]>;
  line2?: Maybe<Scalars["String"]>;
  province?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
  zip?: Maybe<Scalars["String"]>;
};

/** An Appointment */
export type Appointment = Node & {
  __typename?: "Appointment";
  /** A collection of appointment services. */
  appointmentServices: Array<AppointmentService>;
  /** Information about the cancellation, if present */
  cancellation?: Maybe<AppointmentCancellation>;
  /** Boolean signifying if the appointment is cancelled or not */
  cancelled: Scalars["Boolean"];
  /** The client of the appointment */
  client: Client;
  /** The id of the client of the appointment. */
  clientId: Scalars["ID"];
  /** When the appointment was created (in Etc/UTC) */
  createdAt: Scalars["DateTime"];
  /** The duration of the appointment */
  duration: Scalars["Int"];
  /** End time for the appointment */
  endAt: Scalars["DateTime"];
  /** The ID of an object */
  id: Scalars["ID"];
  /** The Location where this appointment was booked. */
  location: Location;
  /** The Id of the Location where this appointment was booked. */
  locationId: Scalars["ID"];
  /** Notes provided by the client during booking */
  notes?: Maybe<Scalars["String"]>;
  /** Start time for the appointment */
  startAt: Scalars["DateTime"];
  /** The state of the appointment. */
  state: AppointmentState;
};

export type AppointmentCancellation = {
  __typename?: "AppointmentCancellation";
  /** Datetime the appointment was cancelled in UTC. */
  cancelledAt: Scalars["DateTime"];
  notes?: Maybe<Scalars["String"]>;
  reason: AppointmentCancellationReason;
};

export enum AppointmentCancellationReason {
  ClientCancel = "CLIENT_CANCEL",
  ClientLateCancel = "CLIENT_LATE_CANCEL",
  Merged = "MERGED",
  Mistake = "MISTAKE",
  NoShow = "NO_SHOW",
  StaffCancel = "STAFF_CANCEL",
  Voided = "VOIDED"
}

export type AppointmentConnection = {
  __typename?: "AppointmentConnection";
  edges?: Maybe<Array<Maybe<AppointmentEdge>>>;
  pageInfo: PageInfo;
};

export type AppointmentEdge = {
  __typename?: "AppointmentEdge";
  cursor?: Maybe<Scalars["String"]>;
  node?: Maybe<Appointment>;
};

export type AppointmentRescheduleAvailableDatesInput = {
  /** The ID of the appointment that needs to be rescheduled. */
  appointmentId: Scalars["ID"];
  /** The lower range (inclusive) of dates to search for appointment availability. */
  searchRangeLower: Scalars["Date"];
  /** The upper range (inclusive) of dates to search for appointment availability. */
  searchRangeUpper: Scalars["Date"];
  /**
   * Optional time zone the matches should be converted to, e.g. the client's
   * time zone. The search range dates are also interpreted using this. When
   * null, the location's time zone is used.
   */
  tz?: Maybe<Scalars["Tz"]>;
};

export type AppointmentRescheduleAvailableDatesPayload = {
  __typename?: "AppointmentRescheduleAvailableDatesPayload";
  availableDates: Array<AvailableRescheduleDate>;
};

export type AppointmentRescheduleAvailableTimesInput = {
  /** The ID of the appointment that needs to be rescheduled. */
  appointmentId: Scalars["ID"];
  /** The date that should be searched for available times. */
  date: Scalars["Date"];
  /**
   * Optional time zone the matches should be converted to, e.g. the client's
   * time zone. When null, the location's time zone is used.
   */
  tz?: Maybe<Scalars["Tz"]>;
};

export type AppointmentRescheduleAvailableTimesPayload = {
  __typename?: "AppointmentRescheduleAvailableTimesPayload";
  availableTimes: Array<AvailableRescheduleTime>;
};

export type AppointmentRescheduleInput = {
  /** The ID of the appointment that needs to be rescheduled. */
  appointmentId: Scalars["ID"];
  /**
   * The encoded data representing an available appointment slot (can be computed
   * using the appointmentRescheduleAvailableTimes mutation).
   */
  bookableTimeId: Scalars["ID"];
  /**
   * Creates a notification for the dashboard users to let them know that the appointment has
   * been self-rescheduled by the client.
   */
  sendNotification: Scalars["Boolean"];
};

export type AppointmentReschedulePayload = {
  __typename?: "AppointmentReschedulePayload";
  appointment: Appointment;
};

/** An AppointmentService */
export type AppointmentService = {
  __typename?: "AppointmentService";
  /** Duration for the entire service (including add-ons) */
  duration: Scalars["Int"];
  /** The ISO time at which the appointment service is completely finished. */
  endAt: Scalars["DateTime"];
  /** Price of the service, before any discounts or taxes are applied. */
  price: Scalars["Money"];
  /** The service. */
  service: Service;
  /** The id of the service.  This may be null for time blockers. */
  serviceId: Scalars["ID"];
  /** The staff performing this service. */
  staff: Staff;
  /** The ID of the staff member associated with this service */
  staffId: Scalars["ID"];
  /** A boolean indicating whether the staff was specifically requested by the client. */
  staffRequested: Scalars["Boolean"];
  /** The ISO time at which the appointment service begins */
  startAt: Scalars["DateTime"];
  /** Length of time (in minutes) from the start of the appointment until this service begins. */
  startTimeOffset: Scalars["Int"];
  /** The total duration (in minutes) of this service */
  totalDuration: Scalars["Int"];
};

export enum AppointmentState {
  Active = "ACTIVE",
  Arrived = "ARRIVED",
  Booked = "BOOKED",
  Cancelled = "CANCELLED",
  Confirmed = "CONFIRMED",
  Final = "FINAL"
}

export type AvailableRescheduleDate = {
  __typename?: "AvailableRescheduleDate";
  /**
   * Matched date for the booking.
   *
   * Note that this date may differ from the one at the location when a specific
   * time zone is requested using the `tz` argument. The date uses the requested
   * time zone, or the location's time zone when `tz` is null.
   */
  date: Scalars["Date"];
};

export type AvailableRescheduleTime = {
  __typename?: "AvailableRescheduleTime";
  bookableTimeId: Scalars["ID"];
  /** Matched start time for the booking. */
  startTime: Scalars["DateTime"];
};

export type BookingQuestionOptionAnswerInput = {
  optionId: Scalars["ID"];
};

/** The business */
export type Business = Node & {
  __typename?: "Business";
  avatar?: Maybe<Scalars["String"]>;
  /** The ID of an object */
  id: Scalars["ID"];
  insertedAt: Scalars["DateTime"];
  /** Locations */
  locations?: Maybe<LocationConnection>;
  /** Name of the business */
  name: Scalars["String"];
  onlineGiftCardSettings: OnlineGiftCardSettings;
  /** The timezone associated with the business */
  tz: Scalars["Tz"];
  updatedAt: Scalars["DateTime"];
  /** The business' website. This could be an empty string. */
  website: Scalars["String"];
};

/** The business */
export type BusinessLocationsArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type BusinessGiftCardDesign = {
  __typename?: "BusinessGiftCardDesign";
  design: GiftCardDesign;
  id: Scalars["ID"];
  selected: Scalars["Boolean"];
};

export type CancelAppointmentInput = {
  id: Scalars["ID"];
  notes?: Maybe<Scalars["String"]>;
};

export type CancelAppointmentPayload = {
  __typename?: "CancelAppointmentPayload";
  appointment: Appointment;
};

/** Represents a cart flow used for booking or purchasing things. */
export type Cart = Node & {
  __typename?: "Cart";
  /** Optional gratuity defined in advance for bookable items. */
  advanceGratuity?: Maybe<CartAdvanceGratuity>;
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
   * Finds one available item by its ID.
   *
   * Note that this item updates as the cart changes. For instance, incompatible
   * items may be disabled after others are added to the cart. Clients should
   * retrieve this item again after mutations or make sure errors are handled
   * when items cannot be added.
   */
  availableItem?: Maybe<CartAvailableItem>;
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
  bookingQuestions: Array<CartBookingQuestion>;
  /**
   * Optional client information supplied when checking out on behalf of someone
   * else than the current user.
   */
  clientInformation?: Maybe<CartClientInformation>;
  /** Optional message from the client to the business. */
  clientMessage?: Maybe<Scalars["String"]>;
  /**
   * Timestamp of when the cart was completed.
   *
   * This field cannot be edited and once completed cannot be changed.
   */
  completedAt?: Maybe<Scalars["DateTime"]>;
  /**
   * When the cart has reserved bookable items, the end time of the latest item.
   * This value is `null` when there are no reservations.
   */
  endTime?: Maybe<Scalars["NaiveDateTime"]>;
  /** Current validation errors. */
  errors: Array<CartError>;
  /**
   * When the cart has reserved bookable items, the timestamp when reservations
   * (e.g. service time selections) expire and need to be selected again. This
   * value is `null` when there are no reservations and is reset into the future
   * whenever a new reservation is added.
   */
  expiresAt?: Maybe<Scalars["DateTime"]>;
  /** Features available to the cart. */
  features: CartFeatures;
  /** A list of guests added to the cart */
  guests: Array<CartGuest>;
  /** The ID of an object */
  id: Scalars["ID"];
  /** Timestamp when the cart was created. */
  insertedAt: Scalars["DateTime"];
  /** Location associated with the cart */
  location?: Maybe<Location>;
  /**
   * A list of offers applied to the cart.
   *
   * Offers can be applied manually using `addCartOffer` and an offer code, but
   * it's also possible for offers to be auto-applied. At this time auto-applied
   * offers cannot be removed from the cart.
   */
  offers: Array<CartOffer>;
  /** Finds one selected item pending checkout by its ID. */
  selectedItem?: Maybe<CartItem>;
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
  startTime?: Maybe<Scalars["NaiveDateTime"]>;
  /**
   * Selected starting time ID for the item, corresponds to the ID that was used
   * to reserve the times. This value is `null` when there are no reservations.
   */
  startTimeId?: Maybe<Scalars["ID"]>;
  /** Summary of the cart, including e.g. line item totals. */
  summary: CartSummary;
  /** Timestamp when the cart was last updated. */
  updatedAt: Scalars["DateTime"];
};

/** Represents a cart flow used for booking or purchasing things. */
export type CartAvailableItemArgs = {
  id: Scalars["ID"];
};

/** Represents a cart flow used for booking or purchasing things. */
export type CartSelectedItemArgs = {
  id: Scalars["ID"];
};

export type CartAddToWaitlistInput = {
  /** ID of the cart. */
  id: Scalars["ID"];
  /** The preferred lower bound date and time of the bookable items. */
  preferredTimeLower: Scalars["NaiveDateTime"];
  /** The preferred upper bound date and time of the bookable items. */
  preferredTimeUpper: Scalars["NaiveDateTime"];
  /**
   * Optional time zone the preferred times should be converted from, e.g. the client's
   * time zone. If a timezone other than the default location's timezone was used when
   * fetching bookable times, then that same timezone should be supplied in this mutation.
   */
  tz?: Maybe<Scalars["Tz"]>;
};

export type CartAddToWaitlistPayload = {
  __typename?: "CartAddToWaitlistPayload";
  cart: Cart;
};

/** Gratuity set in advance for bookable items. */
export type CartAdvanceGratuity = {
  __typename?: "CartAdvanceGratuity";
  /** Fixed gratuity amount, has to be set if `percentage` is not set. */
  fixed?: Maybe<Scalars["Money"]>;
  /** Percentage gratuity amount, has to be set if `fixed` is not set. */
  percentage?: Maybe<Scalars["Float"]>;
};

/** See `CartAdvanceGratuity`. */
export type CartAdvanceGratuityInput = {
  fixed?: Maybe<Scalars["Money"]>;
  percentage?: Maybe<Scalars["Float"]>;
};

/** Item that can be booked through `addCartBookableItem`. */
export type CartAvailableBookableItem = CartAvailableItem & {
  __typename?: "CartAvailableBookableItem";
  /** Refer to the super type. */
  description?: Maybe<Scalars["String"]>;
  /** Refer to the super type. */
  disabled: Scalars["Boolean"];
  /** Refer to the super type. */
  disabledDescription?: Maybe<Scalars["String"]>;
  /** Refer to the super type. */
  id: Scalars["ID"];
  /**
   * Displayed client duration in minutes.
   * @deprecated Use `listDurationRange` instead.
   */
  listDuration: Scalars["Int"];
  /** Refer to the super type. */
  listDurationRange: CartDurationRange;
  /**
   * Refer to the super type.
   * @deprecated Use `listPriceRange` instead.
   */
  listPrice: Scalars["Money"];
  /** Refer to the super type. */
  listPriceRange: CartPriceRange;
  /**
   * List of locations offering the selected bookable item.
   *
   * This is affected by:
   *
   * - Staff / staff role settings set for the services in the cart
   * - The "Bookable online" option for a specific service/location pair
   * - The "Enable online booking" option for a location
   *
   * Location has to be chosen before checking out the cart.
   */
  locationVariants: Array<CartAvailableBookableItemLocationVariant>;
  /** Refer to the super type. */
  name: Scalars["String"];
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
  /**
   * Whether duration varies per staff variant.
   * @deprecated Use `listDurationRange` instead.
   */
  variableDuration: Scalars["Boolean"];
  /**
   * Whether price varies per staff variant.
   * @deprecated Use `listPriceRange` instead.
   */
  variablePrice: Scalars["Boolean"];
};

/** Location variant of a bookable item */
export type CartAvailableBookableItemLocationVariant = {
  __typename?: "CartAvailableBookableItemLocationVariant";
  location: Location;
};

/** Option of a bookable item that can be selected. */
export type CartAvailableBookableItemOption = {
  __typename?: "CartAvailableBookableItemOption";
  /** Short optional description. */
  description?: Maybe<Scalars["String"]>;
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

/**
 * Option group of a bookable item with optional limits.
 *
 * Option groups have their own validation requirements which are validated when
 * the bookable item is added. An error is returned if the selections don’t meet
 * those requirements.
 */
export type CartAvailableBookableItemOptionGroup = {
  __typename?: "CartAvailableBookableItemOptionGroup";
  /** Short optional description. */
  description?: Maybe<Scalars["String"]>;
  /** ID of the option group. */
  id: Scalars["ID"];
  /** Optional maximum number of options that can be selected. */
  maxLimit?: Maybe<Scalars["Int"]>;
  /** Optional minimum number of options that must be selected. */
  minLimit?: Maybe<Scalars["Int"]>;
  /** Short human-readable name. */
  name: Scalars["String"];
  /** List of selectable options. */
  options: Array<CartAvailableBookableItemOption>;
};

/** Staff variant of a bookable item. */
export type CartAvailableBookableItemStaffVariant = {
  __typename?: "CartAvailableBookableItemStaffVariant";
  /** Duration of the variant in minutes. */
  duration: Scalars["Int"];
  /** ID of the variant. */
  id: Scalars["ID"];
  /** Price of the variant before discounts and taxes. */
  price: Scalars["Money"];
  /** Staff member booked. */
  staff: Staff;
};

/** Category of items that can be checked out. */
export type CartAvailableCategory = Node & {
  __typename?: "CartAvailableCategory";
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
  description?: Maybe<Scalars["String"]>;
  /** Whether the category should appear as disabled. */
  disabled: Scalars["Boolean"];
  /** Message detailing why `disabled` is set. Might not be available. */
  disabledDescription?: Maybe<Scalars["String"]>;
  /** The ID of an object */
  id: Scalars["ID"];
  /** Short human-readable name. */
  name: Scalars["String"];
};

/** Gift card that can be purchased through `addCartSelectedGiftCardItem`. */
export type CartAvailableGiftCardItem = CartAvailableItem & {
  __typename?: "CartAvailableGiftCardItem";
  /** When true the user may enter a custom amount between the min and max price range. */
  allowCustomAmounts: Scalars["Boolean"];
  /** Refer to the super type. */
  description?: Maybe<Scalars["String"]>;
  /** Refer to the super type. */
  disabled: Scalars["Boolean"];
  /** Refer to the super type. */
  disabledDescription?: Maybe<Scalars["String"]>;
  /** The maximum available price for which to purchase the gift card. */
  giftCardMax: Scalars["Money"];
  /** The minimum available price for which to purchase the gift card. */
  giftCardMin: Scalars["Money"];
  /** Refer to the super type. */
  id: Scalars["ID"];
  /**
   * Refer to the super type.
   * @deprecated Use `listPriceRange` instead.
   */
  listPrice: Scalars["Money"];
  /** Refer to the super type. */
  listPriceRange: CartPriceRange;
  /** Refer to the super type. */
  name: Scalars["String"];
  /** The available preset prices for which to purchase the gift card. */
  pricePresets: Array<Scalars["Money"]>;
};

/** Abstract available item that can be checked out. */
export type CartAvailableItem = {
  /** Short optional description. */
  description?: Maybe<Scalars["String"]>;
  /** Whether the item should appear disabled or hidden. */
  disabled: Scalars["Boolean"];
  /** Message detailing why `disabled` is set. Might not be available. */
  disabledDescription?: Maybe<Scalars["String"]>;
  /** ID of the item. */
  id: Scalars["ID"];
  /**
   * Displayed price of the item before tax.
   * @deprecated Use `listPriceRange` instead.
   */
  listPrice: Scalars["Money"];
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
};

/** Item that can be purchased through `addCartPurchasableItem`. */
export type CartAvailablePurchasableItem = CartAvailableItem & {
  __typename?: "CartAvailablePurchasableItem";
  /** Refer to the super type. */
  description?: Maybe<Scalars["String"]>;
  /** Refer to the super type. */
  disabled: Scalars["Boolean"];
  /** Refer to the super type. */
  disabledDescription?: Maybe<Scalars["String"]>;
  /** Refer to the super type. */
  id: Scalars["ID"];
  /**
   * Refer to the super type.
   * @deprecated Use `listPriceRange` instead.
   */
  listPrice: Scalars["Money"];
  /** Refer to the super type. */
  listPriceRange: CartPriceRange;
  /** Refer to the super type. */
  name: Scalars["String"];
};

/** Available starting date for bookable items in a cart. */
export type CartBookableDate = {
  __typename?: "CartBookableDate";
  /**
   * Available date for the bookable items.
   *
   * Note that this date may differ from the one at the location when a specific
   * time zone is requested using the `tz` argument. The date uses the requested
   * time zone, or the location's time zone when `tz` is null.
   */
  date: Scalars["Date"];
};

/** An item that can be booked at a certain time. */
export type CartBookableItem = CartItem & {
  __typename?: "CartBookableItem";
  /** Refer to the super type. */
  availablePaymentMethods: Array<CartItemPaymentMethod>;
  /** Refer to the super type. */
  discountAmount?: Maybe<Scalars["Money"]>;
  /** Refer to the super type. */
  discountCode?: Maybe<Scalars["String"]>;
  /** Refer to the super type. */
  errors: Array<CartItemError>;
  /**
   * Guest associated with this item.
   *
   * A null value implies the default guest, i.e. the booking client.
   */
  guest?: Maybe<CartGuest>;
  /**
   * ID of the guest associated with this item.
   *
   * A null value implies the default guest, i.e. the booking client.
   *
   * This field is more efficient than `guest` when only the ID is required.
   */
  guestId?: Maybe<Scalars["ID"]>;
  /** Refer to the super type. */
  id: Scalars["ID"];
  /** Refer to the super type. */
  item: CartAvailableBookableItem;
  /** Refer to the super type. */
  lineTotal?: Maybe<Scalars["Money"]>;
  /** Refer to the super type. */
  price?: Maybe<Scalars["Money"]>;
  /** Any selected options for the item. */
  selectedOptions: Array<CartAvailableBookableItemOption>;
  /** Refer to the super type. */
  selectedPaymentMethod?: Maybe<CartItemPaymentMethod>;
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
  selectedStaffVariant?: Maybe<CartAvailableBookableItemStaffVariant>;
  /**
   * Selected starting time for the item.
   *
   * This value is reserved temporarily. Once the reservation expires, the value
   * reverts to `null` and needs to be selected again. See the parent cart’s
   * `expiresAt` field for more information.
   */
  startTime?: Maybe<Scalars["NaiveDateTime"]>;
  /** Refer to the super type. */
  taxAmount?: Maybe<Scalars["Money"]>;
};

/** Available starting time for bookable items in a cart. */
export type CartBookableTime = {
  __typename?: "CartBookableTime";
  /** ID of this particular time. */
  id: Scalars["ID"];
  /** @deprecated Do not use. */
  score: Scalars["Float"];
  /** Available start time for the earliest bookable item. */
  startTime: Scalars["DateTime"];
};

export type CartBookingQuestion = {
  __typename?: "CartBookingQuestion";
  answer?: Maybe<CartBookingQuestionAnswer>;
  /** How the input for the booking question should be displayed. */
  displayType: CartBookingQuestionDisplayType;
  /** Validation errors for the question */
  errors?: Maybe<Array<Scalars["String"]>>;
  /** Unique ID of the question */
  id: Scalars["ID"];
  /**
   * Unique key of the question. Compared to the IDs (which should
   * always be treated as opaque), this can be be interpreted by the client code.
   * Example use cases include filtering or sorting the questions on the client
   * side based on custom conditions.
   *
   * While this is non-null, this the might not have a meaningful value and
   * currently cannot be set in the UI. Please contact the developer support if
   * you need to use this field.
   */
  key: Scalars["String"];
  /** Booking question displayed label */
  label: Scalars["String"];
  /** Options for select/multiselect booking questions */
  options: Array<CartBookingQuestionOption>;
  /** Whether the answer is required to checkout */
  required: Scalars["Boolean"];
  /** Indicates the type of entity that the booking question answer is mapped to. */
  schema?: Maybe<CartBookingQuestionSchema>;
  /** Accepted type for the booking question answer. */
  valueType: CartBookingQuestionValueType;
};

export type CartBookingQuestionAddAnswerInput = {
  answer: CartBookingQuestionAnswerInput;
  /** The ID of the cart. */
  id: Scalars["ID"];
  /** The ID of the booking question */
  questionId: Scalars["ID"];
};

export type CartBookingQuestionAddAnswerPayload = {
  __typename?: "CartBookingQuestionAddAnswerPayload";
  cart: Cart;
};

/** Current answer for the booking question. */
export type CartBookingQuestionAnswer =
  | CartBookingQuestionBooleanAnswer
  | CartBookingQuestionDatetimeAnswer
  | CartBookingQuestionFloatAnswer
  | CartBookingQuestionIntegerAnswer
  | CartBookingQuestionMultiSelectAnswer
  | CartBookingQuestionSelectAnswer
  | CartBookingQuestionTextAnswer;

export type CartBookingQuestionAnswerInput = {
  booleanValue?: Maybe<Scalars["Boolean"]>;
  datetimeValue?: Maybe<Scalars["DateTime"]>;
  floatValue?: Maybe<Scalars["Float"]>;
  integerValue?: Maybe<Scalars["Int"]>;
  optionValue?: Maybe<BookingQuestionOptionAnswerInput>;
  optionValues?: Maybe<Array<BookingQuestionOptionAnswerInput>>;
  textValue?: Maybe<Scalars["String"]>;
};

export type CartBookingQuestionBooleanAnswer = {
  __typename?: "CartBookingQuestionBooleanAnswer";
  booleanValue: Scalars["Boolean"];
};

export type CartBookingQuestionDatetimeAnswer = {
  __typename?: "CartBookingQuestionDatetimeAnswer";
  datetimeValue: Scalars["DateTime"];
};

export enum CartBookingQuestionDisplayType {
  Boolean = "BOOLEAN",
  Datetime = "DATETIME",
  Float = "FLOAT",
  Integer = "INTEGER",
  LongText = "LONG_TEXT",
  Multiselect = "MULTISELECT",
  Select = "SELECT",
  ShortText = "SHORT_TEXT"
}

export type CartBookingQuestionFloatAnswer = {
  __typename?: "CartBookingQuestionFloatAnswer";
  floatValue: Scalars["Float"];
};

export type CartBookingQuestionIntegerAnswer = {
  __typename?: "CartBookingQuestionIntegerAnswer";
  integerValue: Scalars["Int"];
};

export type CartBookingQuestionMultiSelectAnswer = {
  __typename?: "CartBookingQuestionMultiSelectAnswer";
  options: Array<CartBookingQuestionOption>;
};

export type CartBookingQuestionOption = {
  __typename?: "CartBookingQuestionOption";
  id: Scalars["ID"];
  label: Scalars["String"];
};

export enum CartBookingQuestionSchema {
  Appointment = "APPOINTMENT",
  Client = "CLIENT"
}

export type CartBookingQuestionSelectAnswer = {
  __typename?: "CartBookingQuestionSelectAnswer";
  option: CartBookingQuestionOption;
};

export type CartBookingQuestionTextAnswer = {
  __typename?: "CartBookingQuestionTextAnswer";
  textValue: Scalars["String"];
};

export enum CartBookingQuestionValueType {
  Boolean = "BOOLEAN",
  Datetime = "DATETIME",
  Float = "FLOAT",
  Integer = "INTEGER",
  Multiselect = "MULTISELECT",
  Select = "SELECT",
  Text = "TEXT"
}

/**
 * Client information supplied when checking out as a new user or on behalf of
 * someone else than the current user.
 */
export type CartClientInformation = {
  __typename?: "CartClientInformation";
  /** Email address. */
  email?: Maybe<Scalars["Email"]>;
  /** External ID of the client, used to integrate with external systems. */
  externalId?: Maybe<Scalars["String"]>;
  /** First name. */
  firstName: Scalars["String"];
  /** Last name. */
  lastName?: Maybe<Scalars["String"]>;
  /** Mobile phone number. */
  phoneNumber?: Maybe<Scalars["PhoneNumber"]>;
};

/** See `CartClientInformation`. */
export type CartClientInformationInput = {
  email?: Maybe<Scalars["Email"]>;
  /**
   * External ID of the client, used to integrate with external systems.
   *
   * The value should be unique for every client. Since the validation happens
   * at checkout, if the external ID is not unique for the new client, the value
   * is ignored.
   */
  externalId?: Maybe<Scalars["String"]>;
  firstName: Scalars["String"];
  lastName?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["PhoneNumber"]>;
};

/** Displayed duration range of a bookable item. */
export type CartDurationRange = {
  __typename?: "CartDurationRange";
  /** Maximum duration in minutes. */
  max: Scalars["Int"];
  /** Minimum duration in minutes. */
  min: Scalars["Int"];
  /** Whether the duration is variable, i.e. the minimum and maximum differ. */
  variable: Scalars["Boolean"];
};

/** Cart validation error. */
export type CartError = {
  __typename?: "CartError";
  /** Machine-readable code. */
  code: CartErrorCode;
  /** Detailed geek-readable description. */
  description: Scalars["String"];
  /** Short human-readable message. */
  message: Scalars["String"];
};

/** Machine-readable cart validation error code. */
export enum CartErrorCode {
  /**
   * Some of the required booking questions are not answered.
   *
   * ## Resolution
   *
   * Make sure that all required booking questions have valid answers.
   */
  CartBookingQuestionAnswerMissing = "CART_BOOKING_QUESTION_ANSWER_MISSING",
  /**
   * One or more gift card items do not have a valid price.
   *
   * ## Resolution
   *
   * All gift card items in the cart must have a price in the acceptable range.
   * See cartAvailableGiftCardItem.minPrice and cartAvailableGiftCardItem.maxPrice
   * for upper and lower bound price limits.
   */
  CartGiftCardItemPrice = "CART_GIFT_CARD_ITEM_PRICE",
  /**
   * This cart is not associated with an existing client, therefore separate
   * client information is required.
   *
   * ## Resolution
   *
   * Anonymous carts cannot be checked out. Either an existing user needs to own
   * the cart, or client information must be added using the `clientInformation`
   * field.
   */
  CartMissingClientInformation = "CART_MISSING_CLIENT_INFORMATION",
  /**
   * No cart items have been selected, at least one is required.
   *
   * ## Resolution
   *
   * Add one or more items to the cart before checking out, empty carts cannot be
   * checked out.
   */
  CartMissingItems = "CART_MISSING_ITEMS",
  /**
   * One or more cart items is missing a payment method.
   *
   * ## Resolution
   *
   * All items in the cart that require payment must have a payment method set
   * before checking out. These items will each have a separate item-specific
   * validation error with the same code.
   */
  CartMissingItemPaymentMethod = "CART_MISSING_ITEM_PAYMENT_METHOD",
  /**
   * One or more bookable items is missing a reserved time.
   *
   * ## Resolution
   *
   * All bookable items in the cart must have a reserved time before checking
   * out. These items will each have a separate item-specific validation error
   * with the same code.
   *
   * Note that times are only reserved temporarily and will expire unless the
   * cart is checked out before the expiration time.
   */
  CartMissingItemTime = "CART_MISSING_ITEM_TIME",
  /**
   * A location has not been selected for a cart.
   *
   * ## Resolution
   *
   * Before checking out, select a location for a cart.
   */
  CartMissingLocation = "CART_MISSING_LOCATION"
}

/** Features available to the cart. */
export type CartFeatures = {
  __typename?: "CartFeatures";
  /**
   * Whether the booking questions feature is enabled. It also enables
   * the `CART_BOOKING_QUESTION_ANSWER_MISSING` error on the Cart.
   */
  bookingQuestionsEnabled: Scalars["Boolean"];
  /** Whether gift cards are available to be purchased in this cart. */
  giftCardPurchaseEnabled: Scalars["Boolean"];
  /** Whether payment info is required to check out services in this cart. */
  paymentInfoRequired: Scalars["Boolean"];
};

/** A gift card item that can be purchased. */
export type CartGiftCardItem = CartItem & {
  __typename?: "CartGiftCardItem";
  /** Refer to the super type. */
  availablePaymentMethods: Array<CartItemPaymentMethod>;
  /** Refer to the super type. */
  discountAmount?: Maybe<Scalars["Money"]>;
  /** Refer to the super type. */
  discountCode?: Maybe<Scalars["String"]>;
  /** Send the gift card to a recipient via email. */
  emailFulfillment?: Maybe<CartItemEmailFulfillment>;
  /** Refer to the super type. */
  errors: Array<CartItemError>;
  giftCardDesign?: Maybe<CartItemGiftCardDesign>;
  /** Refer to the super type. */
  id: Scalars["ID"];
  /** Refer to the super type. */
  item: CartAvailableGiftCardItem;
  /** Refer to the super type. */
  lineTotal?: Maybe<Scalars["Money"]>;
  /** Refer to the super type. */
  price?: Maybe<Scalars["Money"]>;
  /** Refer to the super type. */
  selectedPaymentMethod?: Maybe<CartItemPaymentMethod>;
  /** Refer to the super type. */
  taxAmount?: Maybe<Scalars["Money"]>;
};

/** A guest that can be associated with a bookable item. */
export type CartGuest = {
  __typename?: "CartGuest";
  /** Email address, if provided. */
  email?: Maybe<Scalars["Email"]>;
  /** First name, if provided. */
  firstName?: Maybe<Scalars["String"]>;
  /** ID of the guest. */
  id: Scalars["ID"];
  /**
   * Name of the guest if provided, otherwise a user-friendly fallback name that
   * uniquely identifies the guest.
   */
  label: Scalars["String"];
  /** Last name, if provided. */
  lastName?: Maybe<Scalars["String"]>;
  /**
   * Positive ordinal number starting at 1.
   *
   * This is for display purposes, don't use this to uniquely identify guests.
   * Use the `id` field for that instead. Also, don't assume this scheme follows
   * any predefined ordering.
   */
  number: Scalars["Int"];
  /** Mobile phone, if provided. */
  phoneNumber?: Maybe<Scalars["PhoneNumber"]>;
};

/** Abstract item added using the `addCart...Item` mutations. */
export type CartItem = {
  /** Payment methods available for this item. */
  availablePaymentMethods: Array<CartItemPaymentMethod>;
  /** Total discount amount on the price. Null if location is not set yet. */
  discountAmount?: Maybe<Scalars["Money"]>;
  /**
   * Valid discount code that was applied, either the cart's code or one that was
   * applied separately to the item. An invalid code results in a `null` value.
   */
  discountCode?: Maybe<Scalars["String"]>;
  /** Current item validation errors. */
  errors: Array<CartItemError>;
  /** ID of the item. */
  id: Scalars["ID"];
  /** Original item details. */
  item: CartAvailableItem;
  /** Total for the item after discounts and taxes. Null if location is not set yet. */
  lineTotal?: Maybe<Scalars["Money"]>;
  /** Price before discounts and taxes. Null if location is not set yet. */
  price?: Maybe<Scalars["Money"]>;
  /** Payment method selected for this item. */
  selectedPaymentMethod?: Maybe<CartItemPaymentMethod>;
  /** Total tax amount on the discounted price. Null if location is not set yet. */
  taxAmount?: Maybe<Scalars["Money"]>;
};

/** Cart item card payment method. */
export type CartItemCardPaymentMethod = CartItemPaymentMethod & {
  __typename?: "CartItemCardPaymentMethod";
  /** Brand name of the associated card. */
  cardBrand: Scalars["String"];
  /** Expiration month of the associated card. */
  cardExpMonth: Scalars["Int"];
  /** Expiration year of the associated card. */
  cardExpYear: Scalars["Int"];
  /** Holder name of the associated card, might be `null`. */
  cardHolder?: Maybe<Scalars["String"]>;
  /** Whether the associated card is the default card. */
  cardIsDefault: Scalars["Boolean"];
  /** Last four digits of the card number. */
  cardLast4: Scalars["String"];
  /** Refer to the super type. */
  id: Scalars["ID"];
  /** Refer to the super type. */
  name: Scalars["String"];
};

/** Send the item to a recipient via email. */
export type CartItemEmailFulfillment = {
  __typename?: "CartItemEmailFulfillment";
  /** Optionally specify a delivery date for the email. */
  deliveryDate?: Maybe<Scalars["Date"]>;
  id: Scalars["ID"];
  /** Optionally include a message from the sender to the recipient. */
  messageFromSender?: Maybe<Scalars["String"]>;
  /** The email the item should be sent to. */
  recipientEmail: Scalars["Email"];
  /** The name of the person receiving the item. */
  recipientName: Scalars["String"];
  /** The name of the person sending the item. */
  senderName: Scalars["String"];
};

/** Cart item validation error. */
export type CartItemError = {
  __typename?: "CartItemError";
  /** Machine-readable code. */
  code: CartItemErrorCode;
  /** Detailed geek-readable description. */
  description: Scalars["String"];
  /** Short human-readable message. */
  message: Scalars["String"];
};

/** Machine-readable cart item validation error code. */
export enum CartItemErrorCode {
  /**
   * This cart item is missing a payment method.
   *
   * ## Resolution
   *
   * All items in the cart that require payment must have a payment method set
   * before checking out.
   */
  CartMissingItemPaymentMethod = "CART_MISSING_ITEM_PAYMENT_METHOD",
  /**
   * This bookable item is missing a reserved time.
   *
   * ## Resolution
   *
   * All bookable items in the cart must have a reserved time before checking
   * out. Note that times are only reserved temporarily and will expire unless
   * the cart is checked out before the expiration time.
   */
  CartMissingItemTime = "CART_MISSING_ITEM_TIME"
}

/** Specified design for a CartItemEmailFulfillment. */
export type CartItemGiftCardDesign = {
  __typename?: "CartItemGiftCardDesign";
  backgroundColor?: Maybe<Scalars["String"]>;
  foregroundText?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
};

/** Cart item payment method. */
export type CartItemPaymentMethod = {
  /** ID of the method. */
  id: Scalars["ID"];
  /** Short human-readable name. */
  name: Scalars["String"];
};

/** Cart item voucher payment method. */
export type CartItemVoucherPaymentMethod = CartItemPaymentMethod & {
  __typename?: "CartItemVoucherPaymentMethod";
  /** Number of vouchers available, always at least one. */
  availableCount: Scalars["Int"];
  /**
   * Last date when the voucher is valid, or `null` if valid forever.
   *
   * Note that when there are multiple vouchers available with different
   * expiration dates, this is the earliest date when a voucher expires.
   */
  expiresOn?: Maybe<Scalars["Date"]>;
  /** Refer to the super type. */
  id: Scalars["ID"];
  /** Refer to the super type. */
  name: Scalars["String"];
};

/** Offer added to a cart, see the `offers` field. */
export type CartOffer = {
  __typename?: "CartOffer";
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
};

/** Displayed price range of an item, before tax. */
export type CartPriceRange = {
  __typename?: "CartPriceRange";
  /** Maximum price. */
  max: Scalars["Money"];
  /** Minimum price. */
  min: Scalars["Money"];
  /** Whether the price is variable, i.e. the minimum and maximum differ. */
  variable: Scalars["Boolean"];
};

/** An item that can be purchased. */
export type CartPurchasableItem = CartItem & {
  __typename?: "CartPurchasableItem";
  /** Refer to the super type. */
  availablePaymentMethods: Array<CartItemPaymentMethod>;
  /** Refer to the super type. */
  discountAmount?: Maybe<Scalars["Money"]>;
  /** Refer to the super type. */
  discountCode?: Maybe<Scalars["String"]>;
  /** Refer to the super type. */
  errors: Array<CartItemError>;
  /** Refer to the super type. */
  id: Scalars["ID"];
  /** Refer to the super type. */
  item: CartAvailablePurchasableItem;
  /** Refer to the super type. */
  lineTotal?: Maybe<Scalars["Money"]>;
  /** Refer to the super type. */
  price?: Maybe<Scalars["Money"]>;
  /** Refer to the super type. */
  selectedPaymentMethod?: Maybe<CartItemPaymentMethod>;
  /** Refer to the super type. */
  taxAmount?: Maybe<Scalars["Money"]>;
};

export type CartSetLocationInput = {
  /** ID of the cart */
  id: Scalars["ID"];
  /** ID of the location */
  locationId: Scalars["ID"];
};

export type CartSetLocationPayload = {
  __typename?: "CartSetLocationPayload";
  /** Updated Cart */
  cart: Cart;
};

/** Summary of the cart, including e.g. line item totals. */
export type CartSummary = {
  __typename?: "CartSummary";
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
};

export type CheckoutCartInput = {
  /** ID of the cart */
  id: Scalars["ID"];
};

export type CheckoutCartPayload = {
  __typename?: "CheckoutCartPayload";
  cart: Cart;
};

/** A Client */
export type Client = Node & {
  __typename?: "Client";
  /** Email address */
  email?: Maybe<Scalars["Email"]>;
  /** First name */
  firstName?: Maybe<Scalars["String"]>;
  /** The ID of an object */
  id: Scalars["ID"];
  insertedAt: Scalars["DateTime"];
  /** Last name */
  lastName?: Maybe<Scalars["String"]>;
  /** Mobile phone number */
  mobilePhone?: Maybe<Scalars["PhoneNumber"]>;
  /** Full name */
  name?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

/** See `CartItemEmailFulfillment`. */
export type CreateCartGiftCardItemEmailFulfillmentInput = {
  deliveryDate?: Maybe<Scalars["Date"]>;
  /** ID of the cart. */
  id: Scalars["ID"];
  /** The id of the CartGiftCardItem. */
  itemId: Scalars["ID"];
  messageFromSender?: Maybe<Scalars["String"]>;
  recipientEmail: Scalars["Email"];
  recipientName: Scalars["String"];
  senderName: Scalars["String"];
};

export type CreateCartGiftCardItemEmailFulfillmentPayload = {
  __typename?: "CreateCartGiftCardItemEmailFulfillmentPayload";
  cart: Cart;
  emailFulfillment: CartItemEmailFulfillment;
};

export type CreateCartGuestInput = {
  email?: Maybe<Scalars["Email"]>;
  firstName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  lastName?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["PhoneNumber"]>;
};

export type CreateCartGuestPayload = {
  __typename?: "CreateCartGuestPayload";
  cart: Cart;
  guest: CartGuest;
};

export type CreateCartInput = {
  /** Optional gratuity */
  advanceGratuity?: Maybe<CartAdvanceGratuityInput>;
  /** Optional client information */
  clientInformation?: Maybe<CartClientInformationInput>;
  /** Optional message or note from the client to the business */
  clientMessage?: Maybe<Scalars["String"]>;
  /** Optional discount code */
  discountCode?: Maybe<Scalars["String"]>;
  /** ID of the cart location */
  locationId?: Maybe<Scalars["ID"]>;
  /**
   * Referral source for the appointments booked in the cart.
   *
   * This values is mapped to the appointments' 'referral_source' custom
   * field values after checkout.
   */
  referralSource?: Maybe<Scalars["String"]>;
};

export type CreateCartPayload = {
  __typename?: "CreateCartPayload";
  cart: Cart;
};

export type DeleteCartGiftCardItemEmailFulfillmentInput = {
  /** ID of the cart. */
  id: Scalars["ID"];
  /** The id of the CartGiftCardItem. */
  itemId: Scalars["ID"];
};

export type DeleteCartGiftCardItemEmailFulfillmentPayload = {
  __typename?: "DeleteCartGiftCardItemEmailFulfillmentPayload";
  cart: Cart;
};

export type DeleteCartGuestInput = {
  guestId: Scalars["ID"];
  id: Scalars["ID"];
};

export type DeleteCartGuestPayload = {
  __typename?: "DeleteCartGuestPayload";
  cart: Cart;
};

export enum DepositType {
  /** An amount that covers the entire cost of the service is due at the time of booking. In other words, the deposit amount is equal to the total amount */
  FullDeposit = "FULL_DEPOSIT",
  /** There is no deposit required before the time of service. In other words, the deposit amount is zero */
  NoDeposit = "NO_DEPOSIT",
  /** An amount that will go towards the final total amount is due at the time of booking. In other words, the deposit amount is less than the total amount */
  PartialDeposit = "PARTIAL_DEPOSIT"
}

export type GiftCardDesign = {
  __typename?: "GiftCardDesign";
  backgroundColor?: Maybe<Scalars["String"]>;
  foregroundText?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  preset: Scalars["Boolean"];
};

/** Location */
export type Location = Node & {
  __typename?: "Location";
  /** The location's address */
  address: Address;
  /** URL to an image related to the location */
  avatar?: Maybe<Scalars["String"]>;
  /** Name of the business */
  businessName: Scalars["String"];
  /** The coordinates of the location */
  coordinates?: Maybe<Scalars["Coordinates"]>;
  /** Location external id */
  externalId?: Maybe<Scalars["String"]>;
  /** The ID of an object */
  id: Scalars["ID"];
  insertedAt: Scalars["DateTime"];
  /**
   * Indicates that the location is a remote location, and that appointments for
   * this location are carried out remotely.
   */
  isRemote: Scalars["Boolean"];
  /** The location's name */
  name: Scalars["String"];
  /** The location's phone number */
  phoneNumber?: Maybe<Scalars["PhoneNumber"]>;
  /** The location's timezone */
  tz: Scalars["Tz"];
  updatedAt: Scalars["DateTime"];
};

export type LocationConnection = {
  __typename?: "LocationConnection";
  edges?: Maybe<Array<Maybe<LocationEdge>>>;
  pageInfo: PageInfo;
};

export type LocationEdge = {
  __typename?: "LocationEdge";
  cursor?: Maybe<Scalars["String"]>;
  node?: Maybe<Location>;
};

/** A client membership sold at the business. */
export type Membership = Node & {
  __typename?: "Membership";
  /** Client who owns the membership. */
  client: Client;
  /** The id of the client who owns the membership. */
  clientId: Scalars["ID"];
  /**
   * Ending date for the membership.
   *
   * May be NULL to indicate an indefinitely frozen membership.
   */
  endOn?: Maybe<Scalars["Date"]>;
  /** The ID of an object */
  id: Scalars["ID"];
  /** Duration of the membership interval (eg. 1 month). */
  interval: Scalars["DurationInterval"];
  /** The membership name. */
  name: Scalars["String"];
  /** Start date of the membership. */
  startOn: Scalars["Date"];
  /** Membership Status. Active, Cancelled, Past Due or Paused */
  status: SubscriptionStatus;
  /** The current term number of the membership */
  termNumber: Scalars["Int"];
  /** Optional vouchers included with membership */
  vouchers: Array<MembershipVoucher>;
};

export type MembershipConnection = {
  __typename?: "MembershipConnection";
  edges?: Maybe<Array<Maybe<MembershipEdge>>>;
  pageInfo: PageInfo;
};

export type MembershipEdge = {
  __typename?: "MembershipEdge";
  cursor?: Maybe<Scalars["String"]>;
  node?: Maybe<Membership>;
};

/** A membership service voucher */
export type MembershipVoucher = {
  __typename?: "MembershipVoucher";
  /** Number of vouchers included */
  quantity: Scalars["Int"];
  service: Service;
  services: Array<Service>;
};

export type Node = {
  /** The ID of the object. */
  id: Scalars["ID"];
};

export type OnlineGiftCardSettings = {
  __typename?: "OnlineGiftCardSettings";
  giftCardDesigns: Array<BusinessGiftCardDesign>;
  /** ID of the location that will be alloted gift card sales */
  designatedLocationId?: Maybe<Scalars["ID"]>;
  /** Message displayed on the gift card microsite */
  websiteMessage?: Maybe<Scalars["String"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
};

export type RemoveCartOfferInput = {
  /** ID of the cart */
  id: Scalars["ID"];
  /** The offer code identifier */
  offerId: Scalars["String"];
};

export type RemoveCartOfferPayload = {
  __typename?: "RemoveCartOfferPayload";
  cart: Cart;
};

export type RemoveCartSelectedItemInput = {
  /** ID of the cart. */
  id: Scalars["ID"];
  /** ID of the selected item. */
  itemId: Scalars["ID"];
};

export type RemoveCartSelectedItemPayload = {
  __typename?: "RemoveCartSelectedItemPayload";
  cart: Cart;
};

export type ReserveCartBookableItemsInput = {
  /** ID of the bookable time. */
  bookableTimeId: Scalars["ID"];
  /** ID of the cart. */
  id: Scalars["ID"];
};

export type ReserveCartBookableItemsPayload = {
  __typename?: "ReserveCartBookableItemsPayload";
  cart: Cart;
};

export type RootMutationType = {
  __typename?: "RootMutationType";
  /**
   * Add a credit card payment method to a cart.
   *
   * The tokens can be retrieved using the appropriate client-side library.
   */
  addCartCardPaymentMethod?: Maybe<AddCartCardPaymentMethodPayload>;
  /**
   * Add an offer to a cart.
   *
   * When the offer code exists, it's possible that it's not applicable to any
   * items in the cart, in which case the offer is accepted but pricing doesn't
   * change. This status can be checked on each offer. When applicable items are
   * added later, their pricing is updated then.
   *
   * When the offer code doesn't exist, a `CART_OFFER_CODE_INVALID` error is
   * returned.
   */
  addCartOffer?: Maybe<AddCartOfferPayload>;
  /**
   * Add a bookable item to a cart.
   *
   * Using this mutation invalidates existing reservations.
   */
  addCartSelectedBookableItem?: Maybe<AddCartSelectedBookableItemPayload>;
  /** Add a gift card item to a cart. */
  addCartSelectedGiftCardItem?: Maybe<AddCartSelectedGiftCardItemPayload>;
  /** Add a purchasable item to a cart. */
  addCartSelectedPurchasableItem?: Maybe<AddCartSelectedPurchasableItemPayload>;
  /** Reschedule the provided appointment to a new date and time. */
  appointmentReschedule?: Maybe<AppointmentReschedulePayload>;
  /** Get the available dates for the provided appointment. */
  appointmentRescheduleAvailableDates?: Maybe<
    AppointmentRescheduleAvailableDatesPayload
  >;
  /** Get the available appointment times on a particular date for the provided appointment. */
  appointmentRescheduleAvailableTimes?: Maybe<
    AppointmentRescheduleAvailableTimesPayload
  >;
  /**
   * Cancel an Appointment.
   *
   * Cancelling an Appointment automatically updates it's state to `cancelled`
   */
  cancelAppointment?: Maybe<CancelAppointmentPayload>;
  /**
   * Creates a waitlist entry for the cart with the specified date and time ranges
   * as the boundary for the preferred bookable time. Only selected bookable items
   * will be included in the waitlist entry for the cart.
   *
   * This mutation marks the cart as completed, it can no longer be modified.
   */
  cartAddToWaitlist?: Maybe<CartAddToWaitlistPayload>;
  /** Answer a booking question */
  cartBookingQuestionAddAnswer?: Maybe<CartBookingQuestionAddAnswerPayload>;
  /**
   * Sets a location for the cart.
   *
   * Alternative methods for setting a locatin is passing a locationId argument
   * when creating a cart or when adding a first item to an existing cart.
   *
   * Note that the location can only be set once and cannot be changed. When
   * a location is already present on the cart, this mutation returns a
   * `CART_LOCATION_ALREADY_SET` error.
   */
  cartSetLocation?: Maybe<CartSetLocationPayload>;
  /**
   * Completes the checkout process for the given cart.
   *
   * This mutation will first check for any errors in the cart, aborting if
   * any errors exist. Then, it will lock the cart, proceed to attempt to
   * charge the card for any purchaseable items, book all appointments,
   * send relevant email receipts and confirmations, and then mark the
   * cart as completed.
   */
  checkoutCart?: Maybe<CheckoutCartPayload>;
  /** Create a pending cart for the current client */
  createCart?: Maybe<CreateCartPayload>;
  /**
   * Create an email fulfillment for a gift card item. A digital copy of the gift
   * card will be sent to the recipient after the order is completed.
   */
  createCartGiftCardItemEmailFulfillment?: Maybe<
    CreateCartGiftCardItemEmailFulfillmentPayload
  >;
  /** Add a guest to a cart. */
  createCartGuest?: Maybe<CreateCartGuestPayload>;
  /** Delete a gift card item email fulfillment. */
  deleteCartGiftCardItemEmailFulfillment?: Maybe<
    DeleteCartGiftCardItemEmailFulfillmentPayload
  >;
  /**
   * Delete a cart's guest.
   *
   * Using this mutation invalidates existing reservations.
   */
  deleteCartGuest?: Maybe<DeleteCartGuestPayload>;
  /** Remove an offer from the cart. */
  removeCartOffer?: Maybe<RemoveCartOfferPayload>;
  /**
   * Remove a selected item from a cart.
   *
   * Using this mutation invalidates existing reservations when the item being
   * removed is a bookable item.
   */
  removeCartSelectedItem?: Maybe<RemoveCartSelectedItemPayload>;
  /**
   * Reserve one starting time for bookable cart items, i.e. all bookable items
   * are to be performed starting at this time. Note that this call may fail if
   * the time is no longer available.
   */
  reserveCartBookableItems?: Maybe<ReserveCartBookableItemsPayload>;
  /**
   * Select an available payment method to be used with all selected cart items.
   * Note that this call may fail if the payment method is not compatible with
   * all items.
   *
   * This is currently the only way to associate payment methods with cart items.
   * Other mutations may be added later in order to support more complex payment
   * scenarios.
   */
  selectCartPaymentMethod?: Maybe<SelectCartPaymentMethodPayload>;
  /**
   * Take ownership of a cart, linking the cart
   * to a Boulevard account.
   *
   * This mutation needs to be made using an authenticated client token.
   *
   * Using this mutation invalidates existing reservations.
   */
  takeCartOwnership?: Maybe<TakeCartOwnershipPayload>;
  /** Update a pending cart */
  updateCart?: Maybe<UpdateCartPayload>;
  /** Update a gift card item email fulfillment. */
  updateCartGiftCardItemEmailFulfillment?: Maybe<
    UpdateCartGiftCardItemEmailFulfillmentPayload
  >;
  /** Update a cart's guest. */
  updateCartGuest?: Maybe<UpdateCartGuestPayload>;
  /**
   * Update a cart's selected bookable item.
   *
   * Using this mutation invalidates existing reservations when the guest, staff
   * variant, or option IDs are updated.
   */
  updateCartSelectedBookableItem?: Maybe<UpdateCartSelectedBookableItemPayload>;
  /** Update a cart's selected gift card item. */
  updateCartSelectedGiftCardItem?: Maybe<UpdateCartSelectedGiftCardItemPayload>;
  /** Update a cart's selected purchasable item. */
  updateCartSelectedPurchasableItem?: Maybe<
    UpdateCartSelectedPurchasableItemPayload
  >;
  /** Update the authenticated client */
  updateClient?: Maybe<UpdateClientPayload>;
};

export type RootMutationTypeAddCartCardPaymentMethodArgs = {
  input: AddCartCardPaymentMethodInput;
};

export type RootMutationTypeAddCartOfferArgs = {
  input: AddCartOfferInput;
};

export type RootMutationTypeAddCartSelectedBookableItemArgs = {
  input: AddCartSelectedBookableItemInput;
};

export type RootMutationTypeAddCartSelectedGiftCardItemArgs = {
  input: AddCartSelectedGiftCardItemInput;
};

export type RootMutationTypeAddCartSelectedPurchasableItemArgs = {
  input: AddCartSelectedPurchasableItemInput;
};

export type RootMutationTypeAppointmentRescheduleArgs = {
  input: AppointmentRescheduleInput;
};

export type RootMutationTypeAppointmentRescheduleAvailableDatesArgs = {
  input: AppointmentRescheduleAvailableDatesInput;
};

export type RootMutationTypeAppointmentRescheduleAvailableTimesArgs = {
  input: AppointmentRescheduleAvailableTimesInput;
};

export type RootMutationTypeCancelAppointmentArgs = {
  input: CancelAppointmentInput;
};

export type RootMutationTypeCartAddToWaitlistArgs = {
  input: CartAddToWaitlistInput;
};

export type RootMutationTypeCartBookingQuestionAddAnswerArgs = {
  input: CartBookingQuestionAddAnswerInput;
};

export type RootMutationTypeCartSetLocationArgs = {
  input: CartSetLocationInput;
};

export type RootMutationTypeCheckoutCartArgs = {
  input: CheckoutCartInput;
};

export type RootMutationTypeCreateCartArgs = {
  input: CreateCartInput;
};

export type RootMutationTypeCreateCartGiftCardItemEmailFulfillmentArgs = {
  input: CreateCartGiftCardItemEmailFulfillmentInput;
};

export type RootMutationTypeCreateCartGuestArgs = {
  input: CreateCartGuestInput;
};

export type RootMutationTypeDeleteCartGiftCardItemEmailFulfillmentArgs = {
  input: DeleteCartGiftCardItemEmailFulfillmentInput;
};

export type RootMutationTypeDeleteCartGuestArgs = {
  input: DeleteCartGuestInput;
};

export type RootMutationTypeRemoveCartOfferArgs = {
  input: RemoveCartOfferInput;
};

export type RootMutationTypeRemoveCartSelectedItemArgs = {
  input: RemoveCartSelectedItemInput;
};

export type RootMutationTypeReserveCartBookableItemsArgs = {
  input: ReserveCartBookableItemsInput;
};

export type RootMutationTypeSelectCartPaymentMethodArgs = {
  input: SelectCartPaymentMethodInput;
};

export type RootMutationTypeTakeCartOwnershipArgs = {
  input: TakeCartOwnershipInput;
};

export type RootMutationTypeUpdateCartArgs = {
  input: UpdateCartInput;
};

export type RootMutationTypeUpdateCartGiftCardItemEmailFulfillmentArgs = {
  input: UpdateCartGiftCardItemEmailFulfillmentInput;
};

export type RootMutationTypeUpdateCartGuestArgs = {
  input: UpdateCartGuestInput;
};

export type RootMutationTypeUpdateCartSelectedBookableItemArgs = {
  input: UpdateCartSelectedBookableItemInput;
};

export type RootMutationTypeUpdateCartSelectedGiftCardItemArgs = {
  input: UpdateCartSelectedGiftCardItemInput;
};

export type RootMutationTypeUpdateCartSelectedPurchasableItemArgs = {
  input: UpdateCartSelectedPurchasableItemInput;
};

export type RootMutationTypeUpdateClientArgs = {
  input: UpdateClientInput;
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  appointment?: Maybe<Appointment>;
  /** Look up the currently authenticated business */
  business?: Maybe<Business>;
  /** Retrieves a cart by ID. */
  cart?: Maybe<Cart>;
  /**
   * Retrieves available dates for all bookable cart items.
   *
   * Note that the search range will be clamped to the location's minimum and
   * maximum booking lead times. Additionally, If the range is longer than a week,
   * only the first week of matches is returned.
   */
  cartBookableDates?: Maybe<Array<CartBookableDate>>;
  /**
   * Retrieves available staff variants for a specific bookable cart item, given
   * a time that was retrieved earlier using `cartBookableTimes`. In other words,
   * returns all variants that can be selected for the item while still keeping
   * the overall starting time.
   *
   * ## Caveats
   *
   * Because this query assumes that variants of other items stay constant,
   * variants of multiple items must be updated separately by retrieving the
   * variants for one item first, updating that item, and then retrieving the
   * variants for another item.
   *
   * Timing of an item is affected when the variant is updated, which is why any
   * existing reservations are invalidated and the times must be reserved again
   * using `reserveCartBookableItems`.
   */
  cartBookableStaffVariants?: Maybe<
    Array<CartAvailableBookableItemStaffVariant>
  >;
  /**
   * Retrieves available times for all bookable cart items, given a date that
   * was retrieved earlier using `cartBookableDates`.
   */
  cartBookableTimes?: Maybe<Array<CartBookableTime>>;
  /** Look up the authenticated client */
  client?: Maybe<Client>;
  /** List locations for the business */
  locations?: Maybe<LocationConnection>;
  /**
   * List appointments for the authenticated client.
   *
   * The appointment connection supports queries on the following fields:
   *
   * * cancelled: Boolean
   * * locationId: Id
   * * staffId: Id
   * * startAt: DateTime
   */
  myAppointments?: Maybe<AppointmentConnection>;
  /** List memberships for the authenticated client. */
  myMemberships?: Maybe<MembershipConnection>;
  /** Look up a Node by it's Global ID */
  node?: Maybe<Node>;
};

export type RootQueryTypeAppointmentArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypeCartArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypeCartBookableDatesArgs = {
  id: Scalars["ID"];
  limit?: Maybe<Scalars["Int"]>;
  locationId?: Maybe<Scalars["ID"]>;
  searchRangeLower?: Maybe<Scalars["Date"]>;
  searchRangeUpper?: Maybe<Scalars["Date"]>;
  tz?: Maybe<Scalars["Tz"]>;
};

export type RootQueryTypeCartBookableStaffVariantsArgs = {
  bookableTimeId: Scalars["ID"];
  id: Scalars["ID"];
  itemId: Scalars["ID"];
  locationId?: Maybe<Scalars["ID"]>;
};

export type RootQueryTypeCartBookableTimesArgs = {
  id: Scalars["ID"];
  locationId?: Maybe<Scalars["ID"]>;
  searchDate: Scalars["Date"];
  tz?: Maybe<Scalars["Tz"]>;
};

export type RootQueryTypeLocationsArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type RootQueryTypeMyAppointmentsArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  query?: Maybe<Scalars["QueryString"]>;
};

export type RootQueryTypeMyMembershipsArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type RootQueryTypeNodeArgs = {
  id: Scalars["ID"];
};

export type SelectCartPaymentMethodInput = {
  /** ID of the cart. */
  id: Scalars["ID"];
  /** ID of the selected payment method. */
  paymentMethodId: Scalars["ID"];
};

export type SelectCartPaymentMethodPayload = {
  __typename?: "SelectCartPaymentMethodPayload";
  cart: Cart;
};

/** A Service */
export type Service = Node & {
  __typename?: "Service";
  /** Service Category */
  category: ServiceCategory;
  /** Service Category Id */
  categoryId: Scalars["ID"];
  /** Description */
  description?: Maybe<Scalars["String"]>;
  /** External Id */
  externalId?: Maybe<Scalars["String"]>;
  /** The ID of an object */
  id: Scalars["ID"];
  /** Name */
  name: Scalars["String"];
};

/** A ServiceCategory */
export type ServiceCategory = {
  __typename?: "ServiceCategory";
  /** Name */
  name: Scalars["String"];
};

/** Staff */
export type Staff = Node & {
  __typename?: "Staff";
  /** A URL to the Avatar uploaded for this staff within the Boulevard Dashboard */
  avatar?: Maybe<Scalars["String"]>;
  /** A biography of the staff member */
  bio?: Maybe<Scalars["String"]>;
  /** The public display name of the staff member. Preferred over other name fields. */
  displayName: Scalars["String"];
  /** The first name of the staff member. Consider using the display name instead. */
  firstName: Scalars["String"];
  /** The ID of an object */
  id: Scalars["ID"];
  insertedAt: Scalars["DateTime"];
  /** The last name of the staff member. Consider using the display name instead. */
  lastName: Scalars["String"];
  /** The nickname of the staff member. Consider using the display name instead. */
  nickname?: Maybe<Scalars["String"]>;
  /** The role the staff member holds at the business */
  role: StaffRole;
  updatedAt: Scalars["DateTime"];
};

/** Staff Role */
export type StaffRole = Node & {
  __typename?: "StaffRole";
  /** The ID of an object */
  id: Scalars["ID"];
  /** Name of the role */
  name: Scalars["String"];
};

export enum SubscriptionStatus {
  Active = "ACTIVE",
  Cancelled = "CANCELLED",
  PastDue = "PAST_DUE",
  Paused = "PAUSED"
}

export type TakeCartOwnershipInput = {
  /** ID of the cart */
  id: Scalars["ID"];
};

export type TakeCartOwnershipPayload = {
  __typename?: "TakeCartOwnershipPayload";
  cart: Cart;
};

/** See `CartItemEmailFulfillment`. */
export type UpdateCartGiftCardItemEmailFulfillmentInput = {
  deliveryDate?: Maybe<Scalars["Date"]>;
  /** ID of the cart. */
  id: Scalars["ID"];
  /** The id of the CartGiftCardItem. */
  itemId: Scalars["ID"];
  messageFromSender?: Maybe<Scalars["String"]>;
  recipientEmail?: Maybe<Scalars["Email"]>;
  recipientName?: Maybe<Scalars["String"]>;
  senderName?: Maybe<Scalars["String"]>;
};

export type UpdateCartGiftCardItemEmailFulfillmentPayload = {
  __typename?: "UpdateCartGiftCardItemEmailFulfillmentPayload";
  cart: Cart;
  emailFulfillment: CartItemEmailFulfillment;
};

export type UpdateCartGuestInput = {
  email?: Maybe<Scalars["Email"]>;
  firstName?: Maybe<Scalars["String"]>;
  guestId: Scalars["ID"];
  id: Scalars["ID"];
  lastName?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["PhoneNumber"]>;
};

export type UpdateCartGuestPayload = {
  __typename?: "UpdateCartGuestPayload";
  cart: Cart;
  guest: CartGuest;
};

/**
 * Cart fields to update. Only some fields can be updated, there are other
 * mutations available to update more fields.
 */
export type UpdateCartInput = {
  advanceGratuity?: Maybe<CartAdvanceGratuityInput>;
  clientInformation?: Maybe<CartClientInformationInput>;
  clientMessage?: Maybe<Scalars["String"]>;
  discountCode?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  /**
   * Referral source for the appointments booked in the cart.
   *
   * This values is mapped to the appointments' 'referral_source' custom
   * field values after checkout.
   */
  referralSource?: Maybe<Scalars["String"]>;
};

export type UpdateCartPayload = {
  __typename?: "UpdateCartPayload";
  cart: Cart;
};

export type UpdateCartSelectedBookableItemInput = {
  /** ID of the cart. */
  id: Scalars["ID"];
  /**
   * Optional discount code applied to the item. Invalid discount codes are
   * ignored without an error, check `discountCode` on the selected item to see
   * if the code was valid.
   */
  itemDiscountCode?: Maybe<Scalars["String"]>;
  /**
   * Optional ID that identifies the guest this item is booked for. A null
   * value indicates the cart owner, or current client.
   *
   * When finding available times for bookable items, it's assumed that two
   * items having different guests can be booked simultaneously.
   */
  itemGuestId?: Maybe<Scalars["ID"]>;
  /** ID of the selected bookable item. */
  itemId: Scalars["ID"];
  /**
   * Optional IDs of selected bookable item options. Note that the selections
   * must conform to the option group requirements, e.g. limits on the number
   * of options. Otherwise an error is returned.
   */
  itemOptionIds?: Maybe<Array<Scalars["ID"]>>;
  /** Optional ID of the selected bookable item staff variant. */
  itemStaffVariantId?: Maybe<Scalars["ID"]>;
};

export type UpdateCartSelectedBookableItemPayload = {
  __typename?: "UpdateCartSelectedBookableItemPayload";
  cart: Cart;
};

export type UpdateCartSelectedGiftCardItemInput = {
  /** ID of a valid CartItemGiftCardDesign */
  giftCardDesignId?: Maybe<Scalars["ID"]>;
  /** ID of the cart or token. */
  id: Scalars["ID"];
  /** ID of the CartGiftCardItem. */
  itemId: Scalars["ID"];
  /**
   * Price applied to the gift card item. See cartAvailableGiftCardItem.minPrice
   * and maxPrice for limits
   */
  itemPrice?: Maybe<Scalars["Money"]>;
};

export type UpdateCartSelectedGiftCardItemPayload = {
  __typename?: "UpdateCartSelectedGiftCardItemPayload";
  cart: Cart;
};

export type UpdateCartSelectedPurchasableItemInput = {
  /** ID of the cart. */
  id: Scalars["ID"];
  /**
   * Optional discount code applied to the item. Invalid discount codes are
   * ignored without an error, check `discountCode` on the selected item to see
   * if the code was valid.
   */
  itemDiscountCode?: Maybe<Scalars["String"]>;
  /** ID of the selected purchasable item. */
  itemId: Scalars["ID"];
};

export type UpdateCartSelectedPurchasableItemPayload = {
  __typename?: "UpdateCartSelectedPurchasableItemPayload";
  cart: Cart;
};

export type UpdateClientInput = {
  dob?: Maybe<Scalars["Date"]>;
  email?: Maybe<Scalars["Email"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  mobilePhone?: Maybe<Scalars["PhoneNumber"]>;
};

export type UpdateClientPayload = {
  __typename?: "UpdateClientPayload";
  client?: Maybe<Client>;
};
