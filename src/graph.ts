import gql from 'graphql-tag';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  /**
   * Represents an absolute URL as defined by RFC3986
   *
   */
  Url: any;
};

export type AddCartCardPaymentMethodInput = {
  /** ID of the cart */
  id: Scalars['ID'];
  /**
   * Whether to automatically select this credit card as the payment method
   * for the cart, false by default.
   */
  select?: Maybe<Scalars['Boolean']>;
  /** Credit card token obtained from the Credit Card Tokenization endpoint. */
  token: Scalars['ID'];
};

export type AddCartCardPaymentMethodPayload = {
  __typename?: 'AddCartCardPaymentMethodPayload';
  cart: Cart;
};

export type AddCartOfferInput = {
  /** ID of the cart */
  id: Scalars['ID'];
  /** The offer code identifier */
  offerCode: Scalars['String'];
};

export type AddCartOfferPayload = {
  __typename?: 'AddCartOfferPayload';
  cart: Cart;
  offer: CartOffer;
};

export type AddCartSelectedBookableItemInput = {
  /** ID of the cart. */
  id: Scalars['ID'];
  /**
   * Optional discount code applied to the item. Invalid discount codes are
   * ignored without an error, check `discountCode` on the selected item to see
   * if the code was valid.
   */
  itemDiscountCode?: Maybe<Scalars['String']>;
  /**
   * Optional ID that identifies the guest this item is booked for. A null
   * value indicates the cart owner, or current client.
   *
   * When finding available times for bookable items, it's assumed that two
   * items having different guests can be booked simultaneously.
   */
  itemGuestId?: Maybe<Scalars['ID']>;
  /** ID of the bookable item. */
  itemId: Scalars['ID'];
  /**
   * Optional IDs of selected bookable item options. Note that the selections
   * must conform to the option group requirements, e.g. limits on the number
   * of options. Otherwise an error is returned.
   */
  itemOptionIds?: Maybe<Array<Scalars['ID']>>;
  /** Optional ID of the selected bookable item staff variant. */
  itemStaffVariantId?: Maybe<Scalars['ID']>;
};

export type AddCartSelectedBookableItemPayload = {
  __typename?: 'AddCartSelectedBookableItemPayload';
  cart: Cart;
};

export type AddCartSelectedGiftCardItemInput = {
  /** ID of the cart. */
  id: Scalars['ID'];
  /** ID of the gift card item. */
  itemId: Scalars['ID'];
  /**
   * Price applied to the gift card item. See cartAvailableGiftCardItem.minPrice
   * and maxPrice for limits
   */
  itemPrice: Scalars['Money'];
};

export type AddCartSelectedGiftCardItemPayload = {
  __typename?: 'AddCartSelectedGiftCardItemPayload';
  cart: Cart;
};

export type AddCartSelectedPurchasableItemInput = {
  /** ID of the cart. */
  id: Scalars['ID'];
  /**
   * Optional discount code applied to the item. Invalid discount codes are
   * ignored without an error, check `discountCode` on the selected item to see
   * if the code was valid.
   */
  itemDiscountCode?: Maybe<Scalars['String']>;
  /** ID of the purchasable item. */
  itemId: Scalars['ID'];
};

export type AddCartSelectedPurchasableItemPayload = {
  __typename?: 'AddCartSelectedPurchasableItemPayload';
  cart: Cart;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

/** An Appointment */
export type Appointment = Node & {
  __typename?: 'Appointment';
  /** A collection of appointment services. */
  appointmentServices: Array<AppointmentService>;
  /** Links to allow direct addition of the appointment to different calendar platforms */
  calendarLinks: CalendarLinks;
  /** Information about the cancellation, if present */
  cancellation?: Maybe<AppointmentCancellation>;
  /** Boolean signifying if the appointment is cancelled or not */
  cancelled: Scalars['Boolean'];
  /** The client of the appointment */
  client: Client;
  /** The id of the client of the appointment. */
  clientId: Scalars['ID'];
  /** When the appointment was created (in Etc/UTC) */
  createdAt: Scalars['DateTime'];
  /** The duration of the appointment */
  duration: Scalars['Int'];
  /** End time for the appointment */
  endAt: Scalars['DateTime'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** The Location where this appointment was booked. */
  location: Location;
  /** The Id of the Location where this appointment was booked. */
  locationId: Scalars['ID'];
  /** Notes provided by the client during booking */
  notes?: Maybe<Scalars['String']>;
  /** Start time for the appointment */
  startAt: Scalars['DateTime'];
  /** The state of the appointment. */
  state: AppointmentState;
};

export type AppointmentAddTagsInput = {
  cartId: Scalars['ID'];
  id: Scalars['ID'];
  tagIds: Array<Scalars['ID']>;
};

export type AppointmentAddTagsPayload = {
  __typename?: 'AppointmentAddTagsPayload';
  success: Scalars['Boolean'];
};

export type AppointmentCancellation = {
  __typename?: 'AppointmentCancellation';
  /** Datetime the appointment was cancelled in UTC. */
  cancelledAt: Scalars['DateTime'];
  notes?: Maybe<Scalars['String']>;
  reason: AppointmentCancellationReason;
};

export enum AppointmentCancellationReason {
  ClientCancel = 'CLIENT_CANCEL',
  ClientLateCancel = 'CLIENT_LATE_CANCEL',
  Merged = 'MERGED',
  Mistake = 'MISTAKE',
  NoShow = 'NO_SHOW',
  StaffCancel = 'STAFF_CANCEL',
  Voided = 'VOIDED'
}

export type AppointmentConnection = {
  __typename?: 'AppointmentConnection';
  edges?: Maybe<Array<Maybe<AppointmentEdge>>>;
  pageInfo: PageInfo;
};

export type AppointmentEdge = {
  __typename?: 'AppointmentEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Appointment>;
};

export type AppointmentRescheduleAvailableDatesInput = {
  /** The ID of the appointment that needs to be rescheduled. */
  appointmentId: Scalars['ID'];
  /** The lower range (inclusive) of dates to search for appointment availability. */
  searchRangeLower: Scalars['Date'];
  /** The upper range (inclusive) of dates to search for appointment availability. */
  searchRangeUpper: Scalars['Date'];
  /**
   * Optional time zone the matches should be converted to, e.g. the client's
   * time zone. The search range dates are also interpreted using this. When
   * null, the location's time zone is used.
   */
  tz?: Maybe<Scalars['Tz']>;
};

export type AppointmentRescheduleAvailableDatesPayload = {
  __typename?: 'AppointmentRescheduleAvailableDatesPayload';
  availableDates: Array<AvailableRescheduleDate>;
};

export type AppointmentRescheduleAvailableTimesInput = {
  /** The ID of the appointment that needs to be rescheduled. */
  appointmentId: Scalars['ID'];
  /** The date that should be searched for available times. */
  date: Scalars['Date'];
  /**
   * Optional time zone the matches should be converted to, e.g. the client's
   * time zone. When null, the location's time zone is used.
   */
  tz?: Maybe<Scalars['Tz']>;
};

export type AppointmentRescheduleAvailableTimesPayload = {
  __typename?: 'AppointmentRescheduleAvailableTimesPayload';
  availableTimes: Array<AvailableRescheduleTime>;
};

export type AppointmentRescheduleInput = {
  /** The ID of the appointment that needs to be rescheduled. */
  appointmentId: Scalars['ID'];
  /**
   * The encoded data representing an available appointment slot (can be computed
   * using the appointmentRescheduleAvailableTimes mutation).
   */
  bookableTimeId: Scalars['ID'];
  /**
   * Creates a notification for the dashboard users to let them know that the appointment has
   * been self-rescheduled by the client.
   */
  sendNotification: Scalars['Boolean'];
};

export type AppointmentReschedulePayload = {
  __typename?: 'AppointmentReschedulePayload';
  appointment: Appointment;
};

/** An AppointmentService */
export type AppointmentService = {
  __typename?: 'AppointmentService';
  /** Duration for the entire service (including add-ons) */
  duration: Scalars['Int'];
  /** The ISO time at which the appointment service is completely finished. */
  endAt: Scalars['DateTime'];
  /** Price of the service, before any discounts or taxes are applied. */
  price: Scalars['Money'];
  /** The service. */
  service: Service;
  /** The id of the service.  This may be null for time blockers. */
  serviceId: Scalars['ID'];
  /** The staff performing this service. */
  staff: Staff;
  /** The ID of the staff member associated with this service */
  staffId: Scalars['ID'];
  /** A boolean indicating whether the staff was specifically requested by the client. */
  staffRequested: Scalars['Boolean'];
  /** The ISO time at which the appointment service begins */
  startAt: Scalars['DateTime'];
  /** Length of time (in minutes) from the start of the appointment until this service begins. */
  startTimeOffset: Scalars['Int'];
  /** The total duration (in minutes) of this service */
  totalDuration: Scalars['Int'];
};

export enum AppointmentState {
  Active = 'ACTIVE',
  Arrived = 'ARRIVED',
  Booked = 'BOOKED',
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Final = 'FINAL'
}

export type AuthorizeCartOwnershipInput = {
  /** Id of cart to take ownership of */
  cartId: Scalars['String'];
  /** Id of the authorization code */
  clientAuthorizationCodeId: Scalars['String'];
  /** The code that the client received in their email/SMS */
  clientAuthorizationCodeValue: Scalars['Int'];
};

export type AuthorizeCartOwnershipPayload = {
  __typename?: 'AuthorizeCartOwnershipPayload';
  wasAuthorized: Scalars['Boolean'];
};

export type AvailableRescheduleDate = {
  __typename?: 'AvailableRescheduleDate';
  /**
   * Matched date for the booking.
   *
   * Note that this date may differ from the one at the location when a specific
   * time zone is requested using the `tz` argument. The date uses the requested
   * time zone, or the location's time zone when `tz` is null.
   */
  date: Scalars['Date'];
};

export type AvailableRescheduleTime = {
  __typename?: 'AvailableRescheduleTime';
  bookableTimeId: Scalars['ID'];
  /** Matched start time for the booking. */
  startTime: Scalars['DateTime'];
};

export type BookingQuestionOptionAnswerInput = {
  optionId: Scalars['ID'];
};

/** The business */
export type Business = Node & {
  __typename?: 'Business';
  avatar?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  insertedAt: Scalars['DateTime'];
  /** Locations */
  locations?: Maybe<LocationConnection>;
  /** Name of the business */
  name: Scalars['String'];
  onlineGiftCardSettings: OnlineGiftCardSettings;
  /** The timezone associated with the business */
  tz: Scalars['Tz'];
  updatedAt: Scalars['DateTime'];
  /** The business' website. This could be an empty string. */
  website: Scalars['String'];
};


/** The business */
export type BusinessLocationsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type BusinessGiftCardDesign = {
  __typename?: 'BusinessGiftCardDesign';
  design: GiftCardDesign;
  id: Scalars['ID'];
  selected: Scalars['Boolean'];
};

export type CalendarLinks = {
  __typename?: 'CalendarLinks';
  /** A deep link to add the appointment directly to Google Calendar */
  googleCalendar: Scalars['Url'];
  /** A downloadable ICS file to use for native calendar applications */
  icsDownload: Scalars['Url'];
  /** A deep link to add the appointment directly to Microsoft Office 365 */
  microsoftOffice: Scalars['Url'];
  /** A deep link to add the appointment directly to Microsoft Outlook Online */
  microsoftOutlook: Scalars['Url'];
  /** A deep link to add the appointment directly to Yahoo Calendar */
  yahooCalendar: Scalars['Url'];
};

export type CancelAppointmentInput = {
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
};

export type CancelAppointmentPayload = {
  __typename?: 'CancelAppointmentPayload';
  appointment: Appointment;
};

/** Represents a cart flow used for booking or purchasing things. */
export type Cart = Node & {
  __typename?: 'Cart';
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
  clientMessage?: Maybe<Scalars['String']>;
  /**
   * Timestamp of when the cart was completed.
   *
   * This field cannot be edited and once completed cannot be changed.
   */
  completedAt?: Maybe<Scalars['DateTime']>;
  /**
   * When the cart has reserved bookable items, the end time of the latest item.
   * This value is `null` when there are no reservations.
   */
  endTime?: Maybe<Scalars['NaiveDateTime']>;
  /** Current validation errors. */
  errors: Array<CartError>;
  /**
   * When the cart has reserved bookable items, the timestamp when reservations
   * (e.g. service time selections) expire and need to be selected again. This
   * value is `null` when there are no reservations and is reset into the future
   * whenever a new reservation is added.
   */
  expiresAt?: Maybe<Scalars['DateTime']>;
  /** Features available to the cart. */
  features: CartFeatures;
  /** A list of guests added to the cart */
  guests: Array<CartGuest>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** Timestamp when the cart was created. */
  insertedAt: Scalars['DateTime'];
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
  startTime?: Maybe<Scalars['NaiveDateTime']>;
  /**
   * Selected starting time ID for the item, corresponds to the ID that was used
   * to reserve the times. This value is `null` when there are no reservations.
   */
  startTimeId?: Maybe<Scalars['ID']>;
  /** Summary of the cart, including e.g. line item totals. */
  summary: CartSummary;
  /** Timestamp when the cart was last updated. */
  updatedAt: Scalars['DateTime'];
};


/** Represents a cart flow used for booking or purchasing things. */
export type CartAvailableItemArgs = {
  id: Scalars['ID'];
};


/** Represents a cart flow used for booking or purchasing things. */
export type CartSelectedItemArgs = {
  id: Scalars['ID'];
};

export type CartAddToWaitlistInput = {
  /** ID of the cart. */
  id: Scalars['ID'];
  /** The preferred lower bound date and time of the bookable items. */
  preferredTimeLower: Scalars['NaiveDateTime'];
  /** The preferred upper bound date and time of the bookable items. */
  preferredTimeUpper: Scalars['NaiveDateTime'];
  /**
   * Optional time zone the preferred times should be converted from, e.g. the client's
   * time zone. If a timezone other than the default location's timezone was used when
   * fetching bookable times, then that same timezone should be supplied in this mutation.
   */
  tz?: Maybe<Scalars['Tz']>;
};

export type CartAddToWaitlistPayload = {
  __typename?: 'CartAddToWaitlistPayload';
  cart: Cart;
};

/** Gratuity set in advance for bookable items. */
export type CartAdvanceGratuity = {
  __typename?: 'CartAdvanceGratuity';
  /** Fixed gratuity amount, has to be set if `percentage` is not set. */
  fixed?: Maybe<Scalars['Money']>;
  /** Percentage gratuity amount, has to be set if `fixed` is not set. */
  percentage?: Maybe<Scalars['Float']>;
};

/** See `CartAdvanceGratuity`. */
export type CartAdvanceGratuityInput = {
  fixed?: Maybe<Scalars['Money']>;
  percentage?: Maybe<Scalars['Float']>;
};

export type CartAppointment = {
  __typename?: 'CartAppointment';
  appointmentId: Scalars['ID'];
  clientId: Scalars['ID'];
  /** Whether an appointment belongs to the cart owner. */
  forCartOwner: Scalars['Boolean'];
};

/** Item that can be booked through `addCartBookableItem`. */
export type CartAvailableBookableItem = CartAvailableItem & {
  __typename?: 'CartAvailableBookableItem';
  /** Refer to the super type. */
  description?: Maybe<Scalars['String']>;
  /** Refer to the super type. */
  disabled: Scalars['Boolean'];
  /** Refer to the super type. */
  disabledDescription?: Maybe<Scalars['String']>;
  /** Refer to the super type. */
  id: Scalars['ID'];
  /**
   * Displayed client duration in minutes.
   * @deprecated Use `listDurationRange` instead.
   */
  listDuration: Scalars['Int'];
  /** Refer to the super type. */
  listDurationRange: CartDurationRange;
  /**
   * Refer to the super type.
   * @deprecated Use `listPriceRange` instead.
   */
  listPrice: Scalars['Money'];
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
  name: Scalars['String'];
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
  variableDuration: Scalars['Boolean'];
  /**
   * Whether price varies per staff variant.
   * @deprecated Use `listPriceRange` instead.
   */
  variablePrice: Scalars['Boolean'];
};

/** Location variant of a bookable item */
export type CartAvailableBookableItemLocationVariant = {
  __typename?: 'CartAvailableBookableItemLocationVariant';
  location: Location;
};

/** Option of a bookable item that can be selected. */
export type CartAvailableBookableItemOption = {
  __typename?: 'CartAvailableBookableItemOption';
  /** Short optional description. */
  description?: Maybe<Scalars['String']>;
  /** Minutes added to duration when selected. */
  durationDelta: Scalars['Int'];
  /** Group ID of the option. */
  groupId: Scalars['ID'];
  /** ID of the option. */
  id: Scalars['ID'];
  /** Short human-readable name. */
  name: Scalars['String'];
  /** Amount added to price when selected. */
  priceDelta: Scalars['Money'];
};

/**
 * Option group of a bookable item with optional limits.
 *
 * Option groups have their own validation requirements which are validated when
 * the bookable item is added. An error is returned if the selections don’t meet
 * those requirements.
 */
export type CartAvailableBookableItemOptionGroup = {
  __typename?: 'CartAvailableBookableItemOptionGroup';
  /** Short optional description. */
  description?: Maybe<Scalars['String']>;
  /** ID of the option group. */
  id: Scalars['ID'];
  /** Optional maximum number of options that can be selected. */
  maxLimit?: Maybe<Scalars['Int']>;
  /** Optional minimum number of options that must be selected. */
  minLimit?: Maybe<Scalars['Int']>;
  /** Short human-readable name. */
  name: Scalars['String'];
  /** List of selectable options. */
  options: Array<CartAvailableBookableItemOption>;
};

/** Staff variant of a bookable item. */
export type CartAvailableBookableItemStaffVariant = {
  __typename?: 'CartAvailableBookableItemStaffVariant';
  /** Duration of the variant in minutes. */
  duration: Scalars['Int'];
  /** ID of the variant. */
  id: Scalars['ID'];
  /** Price of the variant before discounts and taxes. */
  price: Scalars['Money'];
  /** Staff member booked. */
  staff: Staff;
};

/** Category of items that can be checked out. */
export type CartAvailableCategory = Node & {
  __typename?: 'CartAvailableCategory';
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
  description?: Maybe<Scalars['String']>;
  /** Whether the category should appear as disabled. */
  disabled: Scalars['Boolean'];
  /** Message detailing why `disabled` is set. Might not be available. */
  disabledDescription?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** Short human-readable name. */
  name: Scalars['String'];
};

/** Gift card that can be purchased through `addCartSelectedGiftCardItem`. */
export type CartAvailableGiftCardItem = CartAvailableItem & {
  __typename?: 'CartAvailableGiftCardItem';
  /** When true the user may enter a custom amount between the min and max price range. */
  allowCustomAmounts: Scalars['Boolean'];
  /** Refer to the super type. */
  description?: Maybe<Scalars['String']>;
  /** Refer to the super type. */
  disabled: Scalars['Boolean'];
  /** Refer to the super type. */
  disabledDescription?: Maybe<Scalars['String']>;
  /** The maximum available price for which to purchase the gift card. */
  giftCardMax: Scalars['Money'];
  /** The minimum available price for which to purchase the gift card. */
  giftCardMin: Scalars['Money'];
  /** Refer to the super type. */
  id: Scalars['ID'];
  /**
   * Refer to the super type.
   * @deprecated Use `listPriceRange` instead.
   */
  listPrice: Scalars['Money'];
  /** Refer to the super type. */
  listPriceRange: CartPriceRange;
  /** Refer to the super type. */
  name: Scalars['String'];
  /** The available preset prices for which to purchase the gift card. */
  pricePresets: Array<Scalars['Money']>;
};

/** Abstract available item that can be checked out. */
export type CartAvailableItem = {
  /** Short optional description. */
  description?: Maybe<Scalars['String']>;
  /** Whether the item should appear disabled or hidden. */
  disabled: Scalars['Boolean'];
  /** Message detailing why `disabled` is set. Might not be available. */
  disabledDescription?: Maybe<Scalars['String']>;
  /** ID of the item. */
  id: Scalars['ID'];
  /**
   * Displayed price of the item before tax.
   * @deprecated Use `listPriceRange` instead.
   */
  listPrice: Scalars['Money'];
  /**
   * Displayed price range of the item before tax.
   *
   * The final price may differ based on customizations made to the item before
   * checking out. For instance, bookable items may have variants and options
   * that can be chosen and affect the price.
   */
  listPriceRange: CartPriceRange;
  /** Short human-readable name. */
  name: Scalars['String'];
};

/** Item that can be purchased through `addCartPurchasableItem`. */
export type CartAvailablePurchasableItem = CartAvailableItem & {
  __typename?: 'CartAvailablePurchasableItem';
  /** Refer to the super type. */
  description?: Maybe<Scalars['String']>;
  /** Refer to the super type. */
  disabled: Scalars['Boolean'];
  /** Refer to the super type. */
  disabledDescription?: Maybe<Scalars['String']>;
  /** Refer to the super type. */
  id: Scalars['ID'];
  /**
   * Refer to the super type.
   * @deprecated Use `listPriceRange` instead.
   */
  listPrice: Scalars['Money'];
  /** Refer to the super type. */
  listPriceRange: CartPriceRange;
  /** Refer to the super type. */
  name: Scalars['String'];
};

/** Available starting date for bookable items in a cart. */
export type CartBookableDate = {
  __typename?: 'CartBookableDate';
  /**
   * Available date for the bookable items.
   *
   * Note that this date may differ from the one at the location when a specific
   * time zone is requested using the `tz` argument. The date uses the requested
   * time zone, or the location's time zone when `tz` is null.
   */
  date: Scalars['Date'];
};

/** An item that can be booked at a certain time. */
export type CartBookableItem = CartItem & {
  __typename?: 'CartBookableItem';
  /** Refer to the super type. */
  availablePaymentMethods: Array<CartItemPaymentMethod>;
  /** Refer to the super type. */
  discountAmount?: Maybe<Scalars['Money']>;
  /** Refer to the super type. */
  discountCode?: Maybe<Scalars['String']>;
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
  guestId?: Maybe<Scalars['ID']>;
  /** Refer to the super type. */
  id: Scalars['ID'];
  /** Refer to the super type. */
  item: CartAvailableBookableItem;
  /** Refer to the super type. */
  lineTotal?: Maybe<Scalars['Money']>;
  /** Refer to the super type. */
  price?: Maybe<Scalars['Money']>;
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
  startTime?: Maybe<Scalars['NaiveDateTime']>;
  /** Refer to the super type. */
  taxAmount?: Maybe<Scalars['Money']>;
};

/** Available starting time for bookable items in a cart. */
export type CartBookableTime = {
  __typename?: 'CartBookableTime';
  /** ID of this particular time. */
  id: Scalars['ID'];
  /** @deprecated Do not use. */
  score: Scalars['Float'];
  /** Available start time for the earliest bookable item. */
  startTime: Scalars['DateTime'];
};

export type CartBookingQuestion = {
  __typename?: 'CartBookingQuestion';
  answer?: Maybe<CartBookingQuestionAnswer>;
  /** How the input for the booking question should be displayed. */
  displayType: CartBookingQuestionDisplayType;
  /** Validation errors for the question */
  errors?: Maybe<Array<Scalars['String']>>;
  /** Unique ID of the question */
  id: Scalars['ID'];
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
  key: Scalars['String'];
  /** Booking question displayed label */
  label: Scalars['String'];
  /** Options for select/multiselect booking questions */
  options: Array<CartBookingQuestionOption>;
  /** Whether the answer is required to checkout */
  required: Scalars['Boolean'];
  /** Indicates the type of entity that the booking question answer is mapped to. */
  schema?: Maybe<CartBookingQuestionSchema>;
  /** Accepted type for the booking question answer. */
  valueType: CartBookingQuestionValueType;
};

export type CartBookingQuestionAddAnswerInput = {
  answer: CartBookingQuestionAnswerInput;
  /** The ID of the cart. */
  id: Scalars['ID'];
  /** The ID of the booking question */
  questionId: Scalars['ID'];
};

export type CartBookingQuestionAddAnswerPayload = {
  __typename?: 'CartBookingQuestionAddAnswerPayload';
  cart: Cart;
};

/** Current answer for the booking question. */
export type CartBookingQuestionAnswer = CartBookingQuestionBooleanAnswer | CartBookingQuestionDatetimeAnswer | CartBookingQuestionFloatAnswer | CartBookingQuestionIntegerAnswer | CartBookingQuestionMultiSelectAnswer | CartBookingQuestionSelectAnswer | CartBookingQuestionTextAnswer;

export type CartBookingQuestionAnswerInput = {
  booleanValue?: Maybe<Scalars['Boolean']>;
  datetimeValue?: Maybe<Scalars['DateTime']>;
  floatValue?: Maybe<Scalars['Float']>;
  integerValue?: Maybe<Scalars['Int']>;
  optionValue?: Maybe<BookingQuestionOptionAnswerInput>;
  optionValues?: Maybe<Array<BookingQuestionOptionAnswerInput>>;
  textValue?: Maybe<Scalars['String']>;
};

export type CartBookingQuestionBooleanAnswer = {
  __typename?: 'CartBookingQuestionBooleanAnswer';
  booleanValue: Scalars['Boolean'];
};

export type CartBookingQuestionClearAnswerInput = {
  /** The ID of the cart. */
  id: Scalars['ID'];
  /** The ID of the booking question */
  questionId: Scalars['ID'];
};

export type CartBookingQuestionClearAnswerPayload = {
  __typename?: 'CartBookingQuestionClearAnswerPayload';
  cart: Cart;
};

export type CartBookingQuestionDatetimeAnswer = {
  __typename?: 'CartBookingQuestionDatetimeAnswer';
  datetimeValue: Scalars['DateTime'];
};

export enum CartBookingQuestionDisplayType {
  Boolean = 'BOOLEAN',
  Datetime = 'DATETIME',
  Float = 'FLOAT',
  Integer = 'INTEGER',
  LongText = 'LONG_TEXT',
  Multiselect = 'MULTISELECT',
  Select = 'SELECT',
  ShortText = 'SHORT_TEXT'
}

export type CartBookingQuestionFloatAnswer = {
  __typename?: 'CartBookingQuestionFloatAnswer';
  floatValue: Scalars['Float'];
};

export type CartBookingQuestionIntegerAnswer = {
  __typename?: 'CartBookingQuestionIntegerAnswer';
  integerValue: Scalars['Int'];
};

export type CartBookingQuestionMultiSelectAnswer = {
  __typename?: 'CartBookingQuestionMultiSelectAnswer';
  options: Array<CartBookingQuestionOption>;
};

export type CartBookingQuestionOption = {
  __typename?: 'CartBookingQuestionOption';
  id: Scalars['ID'];
  label: Scalars['String'];
};

export enum CartBookingQuestionSchema {
  Appointment = 'APPOINTMENT',
  Client = 'CLIENT'
}

export type CartBookingQuestionSelectAnswer = {
  __typename?: 'CartBookingQuestionSelectAnswer';
  option: CartBookingQuestionOption;
};

export type CartBookingQuestionTextAnswer = {
  __typename?: 'CartBookingQuestionTextAnswer';
  textValue: Scalars['String'];
};

export enum CartBookingQuestionValueType {
  Boolean = 'BOOLEAN',
  Datetime = 'DATETIME',
  Float = 'FLOAT',
  Integer = 'INTEGER',
  Multiselect = 'MULTISELECT',
  Select = 'SELECT',
  Text = 'TEXT'
}

export type CartClearInput = {
  /** ID of the cart */
  id: Scalars['ID'];
};

export type CartClearPayload = {
  __typename?: 'CartClearPayload';
  cart: Cart;
};

/**
 * Client information supplied when checking out as a new user or on behalf of
 * someone else than the current user.
 */
export type CartClientInformation = {
  __typename?: 'CartClientInformation';
  /** Email address. */
  email?: Maybe<Scalars['Email']>;
  /** External ID of the client, used to integrate with external systems. */
  externalId?: Maybe<Scalars['String']>;
  /** First name. */
  firstName: Scalars['String'];
  /** Last name. */
  lastName?: Maybe<Scalars['String']>;
  /** Mobile phone number. */
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
};

/** See `CartClientInformation`. */
export type CartClientInformationInput = {
  email?: Maybe<Scalars['Email']>;
  /**
   * External ID of the client, used to integrate with external systems.
   *
   * The value should be unique for every client. Since the validation happens
   * at checkout, if the external ID is not unique for the new client, the value
   * is ignored.
   */
  externalId?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
};

/** Displayed duration range of a bookable item. */
export type CartDurationRange = {
  __typename?: 'CartDurationRange';
  /** Maximum duration in minutes. */
  max: Scalars['Int'];
  /** Minimum duration in minutes. */
  min: Scalars['Int'];
  /** Whether the duration is variable, i.e. the minimum and maximum differ. */
  variable: Scalars['Boolean'];
};

/** Cart validation error. */
export type CartError = {
  __typename?: 'CartError';
  /** Machine-readable code. */
  code: CartErrorCode;
  /** Detailed geek-readable description. */
  description: Scalars['String'];
  /** Short human-readable message. */
  message: Scalars['String'];
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
  CartBookingQuestionAnswerMissing = 'CART_BOOKING_QUESTION_ANSWER_MISSING',
  /**
   * One or more gift card items do not have a valid price.
   *
   * ## Resolution
   *
   * All gift card items in the cart must have a price in the acceptable range.
   * See cartAvailableGiftCardItem.minPrice and cartAvailableGiftCardItem.maxPrice
   * for upper and lower bound price limits.
   */
  CartGiftCardItemPrice = 'CART_GIFT_CARD_ITEM_PRICE',
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
  CartMissingClientInformation = 'CART_MISSING_CLIENT_INFORMATION',
  /**
   * No cart items have been selected, at least one is required.
   *
   * ## Resolution
   *
   * Add one or more items to the cart before checking out, empty carts cannot be
   * checked out.
   */
  CartMissingItems = 'CART_MISSING_ITEMS',
  /**
   * One or more cart items is missing a payment method.
   *
   * ## Resolution
   *
   * All items in the cart that require payment must have a payment method set
   * before checking out. These items will each have a separate item-specific
   * validation error with the same code.
   */
  CartMissingItemPaymentMethod = 'CART_MISSING_ITEM_PAYMENT_METHOD',
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
  CartMissingItemTime = 'CART_MISSING_ITEM_TIME',
  /**
   * A location has not been selected for a cart.
   *
   * ## Resolution
   *
   * Before checking out, select a location for a cart.
   */
  CartMissingLocation = 'CART_MISSING_LOCATION'
}

/** Features available to the cart. */
export type CartFeatures = {
  __typename?: 'CartFeatures';
  /**
   * Whether the booking questions feature is enabled. It also enables
   * the `CART_BOOKING_QUESTION_ANSWER_MISSING` error on the Cart.
   */
  bookingQuestionsEnabled: Scalars['Boolean'];
  /** Whether gift cards are available to be purchased in this cart. */
  giftCardPurchaseEnabled: Scalars['Boolean'];
  /** Whether payment info is required to check out services in this cart. */
  paymentInfoRequired: Scalars['Boolean'];
};

/** A gift card item that can be purchased. */
export type CartGiftCardItem = CartItem & {
  __typename?: 'CartGiftCardItem';
  /** Refer to the super type. */
  availablePaymentMethods: Array<CartItemPaymentMethod>;
  /** Refer to the super type. */
  discountAmount?: Maybe<Scalars['Money']>;
  /** Refer to the super type. */
  discountCode?: Maybe<Scalars['String']>;
  /** Send the gift card to a recipient via email. */
  emailFulfillment?: Maybe<CartItemEmailFulfillment>;
  /** Refer to the super type. */
  errors: Array<CartItemError>;
  giftCardDesign?: Maybe<CartItemGiftCardDesign>;
  /** Refer to the super type. */
  id: Scalars['ID'];
  /** Refer to the super type. */
  item: CartAvailableGiftCardItem;
  /** Refer to the super type. */
  lineTotal?: Maybe<Scalars['Money']>;
  /** Refer to the super type. */
  price?: Maybe<Scalars['Money']>;
  /** Refer to the super type. */
  selectedPaymentMethod?: Maybe<CartItemPaymentMethod>;
  /** Refer to the super type. */
  taxAmount?: Maybe<Scalars['Money']>;
};

/** A guest that can be associated with a bookable item. */
export type CartGuest = {
  __typename?: 'CartGuest';
  /** Email address, if provided. */
  email?: Maybe<Scalars['Email']>;
  /** First name, if provided. */
  firstName?: Maybe<Scalars['String']>;
  /** ID of the guest. */
  id: Scalars['ID'];
  /**
   * Name of the guest if provided, otherwise a user-friendly fallback name that
   * uniquely identifies the guest.
   */
  label: Scalars['String'];
  /** Last name, if provided. */
  lastName?: Maybe<Scalars['String']>;
  /**
   * Positive ordinal number starting at 1.
   *
   * This is for display purposes, don't use this to uniquely identify guests.
   * Use the `id` field for that instead. Also, don't assume this scheme follows
   * any predefined ordering.
   */
  number: Scalars['Int'];
  /** Mobile phone, if provided. */
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
};

/** Abstract item added using the `addCart...Item` mutations. */
export type CartItem = {
  /** Payment methods available for this item. */
  availablePaymentMethods: Array<CartItemPaymentMethod>;
  /** Total discount amount on the price. Null if location is not set yet. */
  discountAmount?: Maybe<Scalars['Money']>;
  /**
   * Valid discount code that was applied, either the cart's code or one that was
   * applied separately to the item. An invalid code results in a `null` value.
   */
  discountCode?: Maybe<Scalars['String']>;
  /** Current item validation errors. */
  errors: Array<CartItemError>;
  /** ID of the item. */
  id: Scalars['ID'];
  /** Original item details. */
  item: CartAvailableItem;
  /** Total for the item after discounts and taxes. Null if location is not set yet. */
  lineTotal?: Maybe<Scalars['Money']>;
  /** Price before discounts and taxes. Null if location is not set yet. */
  price?: Maybe<Scalars['Money']>;
  /** Payment method selected for this item. */
  selectedPaymentMethod?: Maybe<CartItemPaymentMethod>;
  /** Total tax amount on the discounted price. Null if location is not set yet. */
  taxAmount?: Maybe<Scalars['Money']>;
};

/** Cart item card payment method. */
export type CartItemCardPaymentMethod = CartItemPaymentMethod & {
  __typename?: 'CartItemCardPaymentMethod';
  /** Brand name of the associated card. */
  cardBrand: Scalars['String'];
  /** Expiration month of the associated card. */
  cardExpMonth: Scalars['Int'];
  /** Expiration year of the associated card. */
  cardExpYear: Scalars['Int'];
  /** Holder name of the associated card, might be `null`. */
  cardHolder?: Maybe<Scalars['String']>;
  /** Whether the associated card is the default card. */
  cardIsDefault: Scalars['Boolean'];
  /** Last four digits of the card number. */
  cardLast4: Scalars['String'];
  /** Refer to the super type. */
  id: Scalars['ID'];
  /** Refer to the super type. */
  name: Scalars['String'];
};

/** Send the item to a recipient via email. */
export type CartItemEmailFulfillment = {
  __typename?: 'CartItemEmailFulfillment';
  /** Optionally specify a delivery date for the email. */
  deliveryDate?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  /** Optionally include a message from the sender to the recipient. */
  messageFromSender?: Maybe<Scalars['String']>;
  /** The email the item should be sent to. */
  recipientEmail: Scalars['Email'];
  /** The name of the person receiving the item. */
  recipientName: Scalars['String'];
  /** The name of the person sending the item. */
  senderName: Scalars['String'];
};

/** Cart item validation error. */
export type CartItemError = {
  __typename?: 'CartItemError';
  /** Machine-readable code. */
  code: CartItemErrorCode;
  /** Detailed geek-readable description. */
  description: Scalars['String'];
  /** Short human-readable message. */
  message: Scalars['String'];
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
  CartMissingItemPaymentMethod = 'CART_MISSING_ITEM_PAYMENT_METHOD',
  /**
   * This bookable item is missing a reserved time.
   *
   * ## Resolution
   *
   * All bookable items in the cart must have a reserved time before checking
   * out. Note that times are only reserved temporarily and will expire unless
   * the cart is checked out before the expiration time.
   */
  CartMissingItemTime = 'CART_MISSING_ITEM_TIME'
}

/** Specified design for a CartItemEmailFulfillment. */
export type CartItemGiftCardDesign = {
  __typename?: 'CartItemGiftCardDesign';
  backgroundColor?: Maybe<Scalars['String']>;
  foregroundText?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
};

/** Cart item payment method. */
export type CartItemPaymentMethod = {
  /** ID of the method. */
  id: Scalars['ID'];
  /** Short human-readable name. */
  name: Scalars['String'];
};

/** Cart item voucher payment method. */
export type CartItemVoucherPaymentMethod = CartItemPaymentMethod & {
  __typename?: 'CartItemVoucherPaymentMethod';
  /** Number of vouchers available, always at least one. */
  availableCount: Scalars['Int'];
  /**
   * Last date when the voucher is valid, or `null` if valid forever.
   *
   * Note that when there are multiple vouchers available with different
   * expiration dates, this is the earliest date when a voucher expires.
   */
  expiresOn?: Maybe<Scalars['Date']>;
  /** Refer to the super type. */
  id: Scalars['ID'];
  /** Refer to the super type. */
  name: Scalars['String'];
};

/** Offer added to a cart, see the `offers` field. */
export type CartOffer = {
  __typename?: 'CartOffer';
  /**
   * Whether this offer is applied to any items currently in the cart.
   *
   * Offers that are not applicable are still valid (i.e. they exist and can be
   * used) but there are no items in the current cart that could be affected.
   * When applicable items are added later, the offer is applied then.
   */
  applied: Scalars['Boolean'];
  /** Case-insensitive, uniquely identifying code. */
  code: Scalars['String'];
  /** ID of the offer. */
  id: Scalars['ID'];
  /** Human-readable name. */
  name: Scalars['String'];
};

/** Displayed price range of an item, before tax. */
export type CartPriceRange = {
  __typename?: 'CartPriceRange';
  /** Maximum price. */
  max: Scalars['Money'];
  /** Minimum price. */
  min: Scalars['Money'];
  /** Whether the price is variable, i.e. the minimum and maximum differ. */
  variable: Scalars['Boolean'];
};

/** An item that can be purchased. */
export type CartPurchasableItem = CartItem & {
  __typename?: 'CartPurchasableItem';
  /** Refer to the super type. */
  availablePaymentMethods: Array<CartItemPaymentMethod>;
  /** Refer to the super type. */
  discountAmount?: Maybe<Scalars['Money']>;
  /** Refer to the super type. */
  discountCode?: Maybe<Scalars['String']>;
  /** Refer to the super type. */
  errors: Array<CartItemError>;
  /** Refer to the super type. */
  id: Scalars['ID'];
  /** Refer to the super type. */
  item: CartAvailablePurchasableItem;
  /** Refer to the super type. */
  lineTotal?: Maybe<Scalars['Money']>;
  /** Refer to the super type. */
  price?: Maybe<Scalars['Money']>;
  /** Refer to the super type. */
  selectedPaymentMethod?: Maybe<CartItemPaymentMethod>;
  /** Refer to the super type. */
  taxAmount?: Maybe<Scalars['Money']>;
};

export type CartSetLocationInput = {
  /** ID of the cart */
  id: Scalars['ID'];
  /** ID of the location */
  locationId: Scalars['ID'];
};

export type CartSetLocationPayload = {
  __typename?: 'CartSetLocationPayload';
  /** Updated Cart */
  cart: Cart;
};

/** Summary of the cart, including e.g. line item totals. */
export type CartSummary = {
  __typename?: 'CartSummary';
  deposit: DepositType;
  /** Total required deposit amount. */
  depositAmount: Scalars['Money'];
  /** Total discount amount on the subtotal. */
  discountAmount: Scalars['Money'];
  /** Total gratuity amount on the subtotal. */
  gratuityAmount: Scalars['Money'];
  /** Whether a payment method is required */
  paymentMethodRequired: Scalars['Boolean'];
  /** Rounding amount on the discounted and taxed subtotal. */
  roundingAmount: Scalars['Money'];
  /** Subtotal before gratuity, discounts, taxes, and rounding. */
  subtotal: Scalars['Money'];
  /** Total tax amount on the discounted subtotal. */
  taxAmount: Scalars['Money'];
  /** Total after gratuity, discounts, taxes, and rounding. */
  total: Scalars['Money'];
};

export type CheckoutCartInput = {
  /** ID of the cart */
  id: Scalars['ID'];
};

export type CheckoutCartPayload = {
  __typename?: 'CheckoutCartPayload';
  appointments: Array<CartAppointment>;
  cart: Cart;
};

/** A Client */
export type Client = Node & {
  __typename?: 'Client';
  /** Email address */
  email?: Maybe<Scalars['Email']>;
  /** First name */
  firstName?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  insertedAt: Scalars['DateTime'];
  /** Last name */
  lastName?: Maybe<Scalars['String']>;
  /** Mobile phone number */
  mobilePhone?: Maybe<Scalars['PhoneNumber']>;
  /** Full name */
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** See `CartItemEmailFulfillment`. */
export type CreateCartGiftCardItemEmailFulfillmentInput = {
  deliveryDate?: Maybe<Scalars['Date']>;
  /** ID of the cart. */
  id: Scalars['ID'];
  /** The id of the CartGiftCardItem. */
  itemId: Scalars['ID'];
  messageFromSender?: Maybe<Scalars['String']>;
  recipientEmail: Scalars['Email'];
  recipientName: Scalars['String'];
  senderName: Scalars['String'];
};

export type CreateCartGiftCardItemEmailFulfillmentPayload = {
  __typename?: 'CreateCartGiftCardItemEmailFulfillmentPayload';
  cart: Cart;
  emailFulfillment: CartItemEmailFulfillment;
};

export type CreateCartGuestInput = {
  email?: Maybe<Scalars['Email']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
};

export type CreateCartGuestPayload = {
  __typename?: 'CreateCartGuestPayload';
  cart: Cart;
  guest: CartGuest;
};

export type CreateCartInput = {
  /** Optional gratuity */
  advanceGratuity?: Maybe<CartAdvanceGratuityInput>;
  /** Optional client information */
  clientInformation?: Maybe<CartClientInformationInput>;
  /** Optional message or note from the client to the business */
  clientMessage?: Maybe<Scalars['String']>;
  /** Optional discount code */
  discountCode?: Maybe<Scalars['String']>;
  /** ID of the cart location */
  locationId?: Maybe<Scalars['ID']>;
  /**
   * Referral source for the appointments booked in the cart.
   *
   * This values is mapped to the appointments' 'referral_source' custom
   * field values after checkout.
   */
  referralSource?: Maybe<Scalars['String']>;
};

export type CreateCartPayload = {
  __typename?: 'CreateCartPayload';
  cart: Cart;
};



export type DeleteCartGiftCardItemEmailFulfillmentInput = {
  /** ID of the cart. */
  id: Scalars['ID'];
  /** The id of the CartGiftCardItem. */
  itemId: Scalars['ID'];
};

export type DeleteCartGiftCardItemEmailFulfillmentPayload = {
  __typename?: 'DeleteCartGiftCardItemEmailFulfillmentPayload';
  cart: Cart;
};

export type DeleteCartGuestInput = {
  guestId: Scalars['ID'];
  id: Scalars['ID'];
};

export type DeleteCartGuestPayload = {
  __typename?: 'DeleteCartGuestPayload';
  cart: Cart;
};

export enum DepositType {
  /** An amount that covers the entire cost of the service is due at the time of booking. In other words, the deposit amount is equal to the total amount */
  FullDeposit = 'FULL_DEPOSIT',
  /** There is no deposit required before the time of service. In other words, the deposit amount is zero */
  NoDeposit = 'NO_DEPOSIT',
  /** An amount that will go towards the final total amount is due at the time of booking. In other words, the deposit amount is less than the total amount */
  PartialDeposit = 'PARTIAL_DEPOSIT'
}



export type GiftCardDesign = {
  __typename?: 'GiftCardDesign';
  backgroundColor?: Maybe<Scalars['String']>;
  foregroundText?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  preset: Scalars['Boolean'];
};

/** Location */
export type Location = Node & {
  __typename?: 'Location';
  /** The location's address */
  address: Address;
  /** URL to an image related to the location */
  avatar?: Maybe<Scalars['String']>;
  /** Name of the business */
  businessName: Scalars['String'];
  /** The coordinates of the location */
  coordinates?: Maybe<Scalars['Coordinates']>;
  /** Location external id */
  externalId?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  insertedAt: Scalars['DateTime'];
  /**
   * Indicates that the location is a remote location, and that appointments for
   * this location are carried out remotely.
   */
  isRemote: Scalars['Boolean'];
  /** The location's name */
  name: Scalars['String'];
  /** The location's phone number */
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
  /** The location's timezone */
  tz: Scalars['Tz'];
  updatedAt: Scalars['DateTime'];
};

export type LocationConnection = {
  __typename?: 'LocationConnection';
  edges?: Maybe<Array<Maybe<LocationEdge>>>;
  pageInfo: PageInfo;
};

export type LocationEdge = {
  __typename?: 'LocationEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Location>;
};

/** A client membership sold at the business. */
export type Membership = Node & {
  __typename?: 'Membership';
  /** Client who owns the membership. */
  client: Client;
  /** The id of the client who owns the membership. */
  clientId: Scalars['ID'];
  /**
   * Ending date for the membership.
   *
   * May be NULL to indicate an indefinitely frozen membership.
   */
  endOn?: Maybe<Scalars['Date']>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** Duration of the membership interval (eg. 1 month). */
  interval: Scalars['DurationInterval'];
  /** The membership name. */
  name: Scalars['String'];
  /** Start date of the membership. */
  startOn: Scalars['Date'];
  /** Membership Status. Active, Cancelled, Past Due or Paused */
  status: SubscriptionStatus;
  /** The current term number of the membership */
  termNumber: Scalars['Int'];
  /** Optional vouchers included with membership */
  vouchers: Array<MembershipVoucher>;
};

export type MembershipConnection = {
  __typename?: 'MembershipConnection';
  edges?: Maybe<Array<Maybe<MembershipEdge>>>;
  pageInfo: PageInfo;
};

export type MembershipEdge = {
  __typename?: 'MembershipEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Membership>;
};

/** A membership service voucher */
export type MembershipVoucher = {
  __typename?: 'MembershipVoucher';
  /** Number of vouchers included */
  quantity: Scalars['Int'];
  service: Service;
  services: Array<Service>;
};



export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type OnlineGiftCardSettings = {
  __typename?: 'OnlineGiftCardSettings';
  giftCardDesigns: Array<BusinessGiftCardDesign>;
  /** ID of the location that will be alloted gift card sales */
  designatedLocationId?: Maybe<Scalars['ID']>;
  /** Message displayed on the gift card microsite */
  websiteMessage?: Maybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};



export type RemoveCartOfferInput = {
  /** ID of the cart */
  id: Scalars['ID'];
  /** The offer code identifier */
  offerId: Scalars['String'];
};

export type RemoveCartOfferPayload = {
  __typename?: 'RemoveCartOfferPayload';
  cart: Cart;
};

export type RemoveCartSelectedItemInput = {
  /** ID of the cart. */
  id: Scalars['ID'];
  /** ID of the selected item. */
  itemId: Scalars['ID'];
};

export type RemoveCartSelectedItemPayload = {
  __typename?: 'RemoveCartSelectedItemPayload';
  cart: Cart;
};

export type ReserveCartBookableItemsInput = {
  /** ID of the bookable time. */
  bookableTimeId: Scalars['ID'];
  /** ID of the cart. */
  id: Scalars['ID'];
};

export type ReserveCartBookableItemsPayload = {
  __typename?: 'ReserveCartBookableItemsPayload';
  cart: Cart;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
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
  /**
   * Adds tags to an appointment.
   *
   * Note that:
   *
   * - The appointment has to come from a cart checked out by the client code.
   * - The operation is idempotent - adding an existing tag to an appointment is
   * a successful no-op.
   * - If any of the tag ids is incorrect, the entire operation is rolled back
   * and an error is returned.
   *
   * To make sure tags are secure and do not leak out via the client code, we
   * only allow adding tags using their ID, not the name. When building custom
   * booking flow, the recommended approach is to embed the tag ID in the code
   * during the build phase.
   */
  appointmentAddTags?: Maybe<AppointmentAddTagsPayload>;
  /** Reschedule the provided appointment to a new date and time. */
  appointmentReschedule?: Maybe<AppointmentReschedulePayload>;
  /** Get the available dates for the provided appointment. */
  appointmentRescheduleAvailableDates?: Maybe<AppointmentRescheduleAvailableDatesPayload>;
  /** Get the available appointment times on a particular date for the provided appointment. */
  appointmentRescheduleAvailableTimes?: Maybe<AppointmentRescheduleAvailableTimesPayload>;
  /** Take ownership of the cart using a client authorization code that's been sent via SMS or email */
  authorizeCartOwnership?: Maybe<AuthorizeCartOwnershipPayload>;
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
  /** Clear the answer for a booking question */
  cartBookingQuestionClearAnswer?: Maybe<CartBookingQuestionClearAnswerPayload>;
  /**
   * Removes all the bookable items, purchasable items, and gift cards from the
   * cart.
   */
  cartClear?: Maybe<CartClearPayload>;
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
  createCartGiftCardItemEmailFulfillment?: Maybe<CreateCartGiftCardItemEmailFulfillmentPayload>;
  /** Add a guest to a cart. */
  createCartGuest?: Maybe<CreateCartGuestPayload>;
  /** Delete a gift card item email fulfillment. */
  deleteCartGiftCardItemEmailFulfillment?: Maybe<DeleteCartGiftCardItemEmailFulfillmentPayload>;
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
  /** Send an authorization code via email that allows the client to take ownership of the cart */
  sendClientAuthorizationCodeViaEmail?: Maybe<SendClientAuthorizationCodeViaEmailPayload>;
  /** Send an authorization code via SMS that allows the client to take ownership of the cart */
  sendClientAuthorizationCodeViaSms?: Maybe<SendClientAuthorizationCodeViaSmsPayload>;
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
  updateCartGiftCardItemEmailFulfillment?: Maybe<UpdateCartGiftCardItemEmailFulfillmentPayload>;
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
  updateCartSelectedPurchasableItem?: Maybe<UpdateCartSelectedPurchasableItemPayload>;
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


export type RootMutationTypeAppointmentAddTagsArgs = {
  input: AppointmentAddTagsInput;
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


export type RootMutationTypeAuthorizeCartOwnershipArgs = {
  input: AuthorizeCartOwnershipInput;
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


export type RootMutationTypeCartBookingQuestionClearAnswerArgs = {
  input: CartBookingQuestionClearAnswerInput;
};


export type RootMutationTypeCartClearArgs = {
  input: CartClearInput;
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


export type RootMutationTypeSendClientAuthorizationCodeViaEmailArgs = {
  input: SendClientAuthorizationCodeViaEmailInput;
};


export type RootMutationTypeSendClientAuthorizationCodeViaSmsArgs = {
  input: SendClientAuthorizationCodeViaSmsInput;
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
  __typename?: 'RootQueryType';
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
  cartBookableStaffVariants?: Maybe<Array<CartAvailableBookableItemStaffVariant>>;
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
  cartId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
};


export type RootQueryTypeCartArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypeCartBookableDatesArgs = {
  id: Scalars['ID'];
  limit?: Maybe<Scalars['Int']>;
  locationId?: Maybe<Scalars['ID']>;
  searchRangeLower?: Maybe<Scalars['Date']>;
  searchRangeUpper?: Maybe<Scalars['Date']>;
  tz?: Maybe<Scalars['Tz']>;
};


export type RootQueryTypeCartBookableStaffVariantsArgs = {
  bookableTimeId: Scalars['ID'];
  id: Scalars['ID'];
  itemId: Scalars['ID'];
  locationId?: Maybe<Scalars['ID']>;
};


export type RootQueryTypeCartBookableTimesArgs = {
  id: Scalars['ID'];
  locationId?: Maybe<Scalars['ID']>;
  searchDate: Scalars['Date'];
  staffVariantIds?: Maybe<Array<Scalars['ID']>>;
  tz?: Maybe<Scalars['Tz']>;
};


export type RootQueryTypeLocationsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type RootQueryTypeMyAppointmentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['QueryString']>;
};


export type RootQueryTypeMyMembershipsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type RootQueryTypeNodeArgs = {
  id: Scalars['ID'];
};

export type SelectCartPaymentMethodInput = {
  /** ID of the cart. */
  id: Scalars['ID'];
  /** ID of the selected payment method. */
  paymentMethodId: Scalars['ID'];
};

export type SelectCartPaymentMethodPayload = {
  __typename?: 'SelectCartPaymentMethodPayload';
  cart: Cart;
};

export type SendClientAuthorizationCodeViaEmailInput = {
  /** Email to send the authorization code to */
  email: Scalars['String'];
};

export type SendClientAuthorizationCodeViaEmailPayload = {
  __typename?: 'SendClientAuthorizationCodeViaEmailPayload';
  clientAuthorizationCodeId: Scalars['String'];
};

export type SendClientAuthorizationCodeViaSmsInput = {
  /** Mobile phone number to send the authorization code to */
  mobilePhone: Scalars['String'];
};

export type SendClientAuthorizationCodeViaSmsPayload = {
  __typename?: 'SendClientAuthorizationCodeViaSmsPayload';
  clientAuthorizationCodeId: Scalars['String'];
};

/** A Service */
export type Service = Node & {
  __typename?: 'Service';
  /** Service Category */
  category: ServiceCategory;
  /** Service Category Id */
  categoryId: Scalars['ID'];
  /** Description */
  description?: Maybe<Scalars['String']>;
  /** External Id */
  externalId?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** Name */
  name: Scalars['String'];
};

/** A ServiceCategory */
export type ServiceCategory = {
  __typename?: 'ServiceCategory';
  /** Name */
  name: Scalars['String'];
};

/** Staff */
export type Staff = Node & {
  __typename?: 'Staff';
  /** A URL to the Avatar uploaded for this staff within the Boulevard Dashboard */
  avatar?: Maybe<Scalars['String']>;
  /** A biography of the staff member */
  bio?: Maybe<Scalars['String']>;
  /** The public display name of the staff member. Preferred over other name fields. */
  displayName: Scalars['String'];
  /** The first name of the staff member. Consider using the display name instead. */
  firstName: Scalars['String'];
  /** The ID of an object */
  id: Scalars['ID'];
  insertedAt: Scalars['DateTime'];
  /** The last name of the staff member. Consider using the display name instead. */
  lastName: Scalars['String'];
  /** The nickname of the staff member. Consider using the display name instead. */
  nickname?: Maybe<Scalars['String']>;
  /** The role the staff member holds at the business */
  role: StaffRole;
  updatedAt: Scalars['DateTime'];
};

/** Staff Role */
export type StaffRole = Node & {
  __typename?: 'StaffRole';
  /** The ID of an object */
  id: Scalars['ID'];
  /** Name of the role */
  name: Scalars['String'];
};

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  PastDue = 'PAST_DUE',
  Paused = 'PAUSED'
}

export type TakeCartOwnershipInput = {
  /** ID of the cart */
  id: Scalars['ID'];
};

export type TakeCartOwnershipPayload = {
  __typename?: 'TakeCartOwnershipPayload';
  cart: Cart;
};


/** See `CartItemEmailFulfillment`. */
export type UpdateCartGiftCardItemEmailFulfillmentInput = {
  deliveryDate?: Maybe<Scalars['Date']>;
  /** ID of the cart. */
  id: Scalars['ID'];
  /** The id of the CartGiftCardItem. */
  itemId: Scalars['ID'];
  messageFromSender?: Maybe<Scalars['String']>;
  recipientEmail?: Maybe<Scalars['Email']>;
  recipientName?: Maybe<Scalars['String']>;
  senderName?: Maybe<Scalars['String']>;
};

export type UpdateCartGiftCardItemEmailFulfillmentPayload = {
  __typename?: 'UpdateCartGiftCardItemEmailFulfillmentPayload';
  cart: Cart;
  emailFulfillment: CartItemEmailFulfillment;
};

export type UpdateCartGuestInput = {
  email?: Maybe<Scalars['Email']>;
  firstName?: Maybe<Scalars['String']>;
  guestId: Scalars['ID'];
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
};

export type UpdateCartGuestPayload = {
  __typename?: 'UpdateCartGuestPayload';
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
  clientMessage?: Maybe<Scalars['String']>;
  discountCode?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /**
   * Referral source for the appointments booked in the cart.
   *
   * This values is mapped to the appointments' 'referral_source' custom
   * field values after checkout.
   */
  referralSource?: Maybe<Scalars['String']>;
};

export type UpdateCartPayload = {
  __typename?: 'UpdateCartPayload';
  cart: Cart;
};

export type UpdateCartSelectedBookableItemInput = {
  /** ID of the cart. */
  id: Scalars['ID'];
  /**
   * Optional discount code applied to the item. Invalid discount codes are
   * ignored without an error, check `discountCode` on the selected item to see
   * if the code was valid.
   */
  itemDiscountCode?: Maybe<Scalars['String']>;
  /**
   * Optional ID that identifies the guest this item is booked for. A null
   * value indicates the cart owner, or current client.
   *
   * When finding available times for bookable items, it's assumed that two
   * items having different guests can be booked simultaneously.
   */
  itemGuestId?: Maybe<Scalars['ID']>;
  /** ID of the selected bookable item. */
  itemId: Scalars['ID'];
  /**
   * Optional IDs of selected bookable item options. Note that the selections
   * must conform to the option group requirements, e.g. limits on the number
   * of options. Otherwise an error is returned.
   */
  itemOptionIds?: Maybe<Array<Scalars['ID']>>;
  /** Optional ID of the selected bookable item staff variant. */
  itemStaffVariantId?: Maybe<Scalars['ID']>;
};

export type UpdateCartSelectedBookableItemPayload = {
  __typename?: 'UpdateCartSelectedBookableItemPayload';
  cart: Cart;
};

export type UpdateCartSelectedGiftCardItemInput = {
  /** ID of a valid CartItemGiftCardDesign */
  giftCardDesignId?: Maybe<Scalars['ID']>;
  /** ID of the cart or token. */
  id: Scalars['ID'];
  /** ID of the CartGiftCardItem. */
  itemId: Scalars['ID'];
  /**
   * Price applied to the gift card item. See cartAvailableGiftCardItem.minPrice
   * and maxPrice for limits
   */
  itemPrice?: Maybe<Scalars['Money']>;
};

export type UpdateCartSelectedGiftCardItemPayload = {
  __typename?: 'UpdateCartSelectedGiftCardItemPayload';
  cart: Cart;
};

export type UpdateCartSelectedPurchasableItemInput = {
  /** ID of the cart. */
  id: Scalars['ID'];
  /**
   * Optional discount code applied to the item. Invalid discount codes are
   * ignored without an error, check `discountCode` on the selected item to see
   * if the code was valid.
   */
  itemDiscountCode?: Maybe<Scalars['String']>;
  /** ID of the selected purchasable item. */
  itemId: Scalars['ID'];
};

export type UpdateCartSelectedPurchasableItemPayload = {
  __typename?: 'UpdateCartSelectedPurchasableItemPayload';
  cart: Cart;
};

export type UpdateClientInput = {
  dob?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['Email']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['PhoneNumber']>;
};

export type UpdateClientPayload = {
  __typename?: 'UpdateClientPayload';
  client?: Maybe<Client>;
};


export type SendClientAuthorizationCodeViaSmsMutationVariables = Exact<{
  input: SendClientAuthorizationCodeViaSmsInput;
}>;


export type SendClientAuthorizationCodeViaSmsMutation = (
  { __typename?: 'RootMutationType' }
  & { sendClientAuthorizationCodeViaSms?: Maybe<(
    { __typename?: 'SendClientAuthorizationCodeViaSmsPayload' }
    & Pick<SendClientAuthorizationCodeViaSmsPayload, 'clientAuthorizationCodeId'>
  )> }
);

export type SendClientAuthorizationCodeViaEmailMutationVariables = Exact<{
  input: SendClientAuthorizationCodeViaEmailInput;
}>;


export type SendClientAuthorizationCodeViaEmailMutation = (
  { __typename?: 'RootMutationType' }
  & { sendClientAuthorizationCodeViaEmail?: Maybe<(
    { __typename?: 'SendClientAuthorizationCodeViaEmailPayload' }
    & Pick<SendClientAuthorizationCodeViaEmailPayload, 'clientAuthorizationCodeId'>
  )> }
);

export type AuthorizeCartOwnershipMutationVariables = Exact<{
  input: AuthorizeCartOwnershipInput;
}>;


export type AuthorizeCartOwnershipMutation = (
  { __typename?: 'RootMutationType' }
  & { authorizeCartOwnership?: Maybe<(
    { __typename?: 'AuthorizeCartOwnershipPayload' }
    & Pick<AuthorizeCartOwnershipPayload, 'wasAuthorized'>
  )> }
);


export const SendClientAuthorizationCodeViaSms = gql`
    mutation sendClientAuthorizationCodeViaSms($input: SendClientAuthorizationCodeViaSmsInput!) {
  sendClientAuthorizationCodeViaSms(input: $input) {
    clientAuthorizationCodeId
  }
}
    `;
export const SendClientAuthorizationCodeViaEmail = gql`
    mutation sendClientAuthorizationCodeViaEmail($input: SendClientAuthorizationCodeViaEmailInput!) {
  sendClientAuthorizationCodeViaEmail(input: $input) {
    clientAuthorizationCodeId
  }
}
    `;
export const AuthorizeCartOwnership = gql`
    mutation authorizeCartOwnership($input: AuthorizeCartOwnershipInput!) {
  authorizeCartOwnership(input: $input) {
    wasAuthorized
  }
}
    `;

export const SendClientAuthorizationCodeViaSmsDocument = gql`
    mutation sendClientAuthorizationCodeViaSms($input: SendClientAuthorizationCodeViaSmsInput!) {
  sendClientAuthorizationCodeViaSms(input: $input) {
    clientAuthorizationCodeId
  }
}
    `;
export const SendClientAuthorizationCodeViaEmailDocument = gql`
    mutation sendClientAuthorizationCodeViaEmail($input: SendClientAuthorizationCodeViaEmailInput!) {
  sendClientAuthorizationCodeViaEmail(input: $input) {
    clientAuthorizationCodeId
  }
}
    `;
export const AuthorizeCartOwnershipDocument = gql`
    mutation authorizeCartOwnership($input: AuthorizeCartOwnershipInput!) {
  authorizeCartOwnership(input: $input) {
    wasAuthorized
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    sendClientAuthorizationCodeViaSms(variables: SendClientAuthorizationCodeViaSmsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SendClientAuthorizationCodeViaSmsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendClientAuthorizationCodeViaSmsMutation>(SendClientAuthorizationCodeViaSmsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sendClientAuthorizationCodeViaSms');
    },
    sendClientAuthorizationCodeViaEmail(variables: SendClientAuthorizationCodeViaEmailMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SendClientAuthorizationCodeViaEmailMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendClientAuthorizationCodeViaEmailMutation>(SendClientAuthorizationCodeViaEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sendClientAuthorizationCodeViaEmail');
    },
    authorizeCartOwnership(variables: AuthorizeCartOwnershipMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AuthorizeCartOwnershipMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthorizeCartOwnershipMutation>(AuthorizeCartOwnershipDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'authorizeCartOwnership');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;

export const anAddCartCardPaymentMethodInput = (overrides?: Partial<AddCartCardPaymentMethodInput>): AddCartCardPaymentMethodInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '5dd6869c-15b0-441e-9221-c1b617715162',
        select: overrides && overrides.hasOwnProperty('select') ? overrides.select! : true,
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : 'e2f84ae2-28e6-492e-8a85-9b6588c5f157',
    };
};

export const anAddCartCardPaymentMethodPayload = (overrides?: Partial<AddCartCardPaymentMethodPayload>): AddCartCardPaymentMethodPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const anAddCartOfferInput = (overrides?: Partial<AddCartOfferInput>): AddCartOfferInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '1f4f839f-de0d-442c-86da-5e08f668a1e3',
        offerCode: overrides && overrides.hasOwnProperty('offerCode') ? overrides.offerCode! : 'non',
    };
};

export const anAddCartOfferPayload = (overrides?: Partial<AddCartOfferPayload>): AddCartOfferPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
        offer: overrides && overrides.hasOwnProperty('offer') ? overrides.offer! : aCartOffer(),
    };
};

export const anAddCartSelectedBookableItemInput = (overrides?: Partial<AddCartSelectedBookableItemInput>): AddCartSelectedBookableItemInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '2924d7d6-584f-46e7-9a54-e23e76057b17',
        itemDiscountCode: overrides && overrides.hasOwnProperty('itemDiscountCode') ? overrides.itemDiscountCode! : 'debitis',
        itemGuestId: overrides && overrides.hasOwnProperty('itemGuestId') ? overrides.itemGuestId! : '8f1bf3a0-2aaa-45ff-9eab-55bf1748d47a',
        itemId: overrides && overrides.hasOwnProperty('itemId') ? overrides.itemId! : '5f97081f-3719-48e3-b365-36004dd1e812',
        itemOptionIds: overrides && overrides.hasOwnProperty('itemOptionIds') ? overrides.itemOptionIds! : ['2329067c-5a98-4e38-8405-1e479d05f057'],
        itemStaffVariantId: overrides && overrides.hasOwnProperty('itemStaffVariantId') ? overrides.itemStaffVariantId! : 'b01853f0-a0db-4554-bca6-8a069e3787b9',
    };
};

export const anAddCartSelectedBookableItemPayload = (overrides?: Partial<AddCartSelectedBookableItemPayload>): AddCartSelectedBookableItemPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const anAddCartSelectedGiftCardItemInput = (overrides?: Partial<AddCartSelectedGiftCardItemInput>): AddCartSelectedGiftCardItemInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'af75ff4d-07ad-43fa-a29b-cf57ab2c5a21',
        itemId: overrides && overrides.hasOwnProperty('itemId') ? overrides.itemId! : '1eb57a5a-085f-4262-a007-1dadaccad074',
        itemPrice: overrides && overrides.hasOwnProperty('itemPrice') ? overrides.itemPrice! : 'nam',
    };
};

export const anAddCartSelectedGiftCardItemPayload = (overrides?: Partial<AddCartSelectedGiftCardItemPayload>): AddCartSelectedGiftCardItemPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const anAddCartSelectedPurchasableItemInput = (overrides?: Partial<AddCartSelectedPurchasableItemInput>): AddCartSelectedPurchasableItemInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '9cbf379c-88e4-47ca-923a-4a4bcdbc2888',
        itemDiscountCode: overrides && overrides.hasOwnProperty('itemDiscountCode') ? overrides.itemDiscountCode! : 'illo',
        itemId: overrides && overrides.hasOwnProperty('itemId') ? overrides.itemId! : '1fa32b2f-9ce7-4d51-b815-30b80663fb25',
    };
};

export const anAddCartSelectedPurchasableItemPayload = (overrides?: Partial<AddCartSelectedPurchasableItemPayload>): AddCartSelectedPurchasableItemPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const anAddress = (overrides?: Partial<Address>): Address => {
    return {
        city: overrides && overrides.hasOwnProperty('city') ? overrides.city! : 'amet',
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'non',
        line1: overrides && overrides.hasOwnProperty('line1') ? overrides.line1! : 'beatae',
        line2: overrides && overrides.hasOwnProperty('line2') ? overrides.line2! : 'itaque',
        province: overrides && overrides.hasOwnProperty('province') ? overrides.province! : 'est',
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : 'non',
        zip: overrides && overrides.hasOwnProperty('zip') ? overrides.zip! : 'rerum',
    };
};

export const anAppointment = (overrides?: Partial<Appointment>): Appointment => {
    return {
        appointmentServices: overrides && overrides.hasOwnProperty('appointmentServices') ? overrides.appointmentServices! : [anAppointmentService()],
        calendarLinks: overrides && overrides.hasOwnProperty('calendarLinks') ? overrides.calendarLinks! : aCalendarLinks(),
        cancellation: overrides && overrides.hasOwnProperty('cancellation') ? overrides.cancellation! : anAppointmentCancellation(),
        cancelled: overrides && overrides.hasOwnProperty('cancelled') ? overrides.cancelled! : true,
        client: overrides && overrides.hasOwnProperty('client') ? overrides.client! : aClient(),
        clientId: overrides && overrides.hasOwnProperty('clientId') ? overrides.clientId! : 'd1e8b066-c7b5-4c7b-a148-0b819fd27b2f',
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'ea',
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 2893,
        endAt: overrides && overrides.hasOwnProperty('endAt') ? overrides.endAt! : 'rem',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '746c73a0-8eae-47e7-a1b2-bcf2b2a0994f',
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : aLocation(),
        locationId: overrides && overrides.hasOwnProperty('locationId') ? overrides.locationId! : '4d2d5ed1-5d55-4a9c-b05e-2cf090b04005',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'deleniti',
        startAt: overrides && overrides.hasOwnProperty('startAt') ? overrides.startAt! : 'ut',
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : AppointmentState.Active,
    };
};

export const anAppointmentAddTagsInput = (overrides?: Partial<AppointmentAddTagsInput>): AppointmentAddTagsInput => {
    return {
        cartId: overrides && overrides.hasOwnProperty('cartId') ? overrides.cartId! : 'f85f788b-9049-4c50-a205-c544729299cf',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'd6772139-d0a2-4c3f-b886-4c60f159b749',
        tagIds: overrides && overrides.hasOwnProperty('tagIds') ? overrides.tagIds! : ['efb89cf9-b9e5-4f2d-b443-75f35e26e41c'],
    };
};

export const anAppointmentAddTagsPayload = (overrides?: Partial<AppointmentAddTagsPayload>): AppointmentAddTagsPayload => {
    return {
        success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
    };
};

export const anAppointmentCancellation = (overrides?: Partial<AppointmentCancellation>): AppointmentCancellation => {
    return {
        cancelledAt: overrides && overrides.hasOwnProperty('cancelledAt') ? overrides.cancelledAt! : 'excepturi',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'repudiandae',
        reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : AppointmentCancellationReason.ClientCancel,
    };
};

export const anAppointmentConnection = (overrides?: Partial<AppointmentConnection>): AppointmentConnection => {
    return {
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [anAppointmentEdge()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const anAppointmentEdge = (overrides?: Partial<AppointmentEdge>): AppointmentEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'voluptatem',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : anAppointment(),
    };
};

export const anAppointmentRescheduleAvailableDatesInput = (overrides?: Partial<AppointmentRescheduleAvailableDatesInput>): AppointmentRescheduleAvailableDatesInput => {
    return {
        appointmentId: overrides && overrides.hasOwnProperty('appointmentId') ? overrides.appointmentId! : 'b699ec2a-811a-4d7e-b1ac-d2367ac38156',
        searchRangeLower: overrides && overrides.hasOwnProperty('searchRangeLower') ? overrides.searchRangeLower! : '1970-07-15',
        searchRangeUpper: overrides && overrides.hasOwnProperty('searchRangeUpper') ? overrides.searchRangeUpper! : '2006-08-28',
        tz: overrides && overrides.hasOwnProperty('tz') ? overrides.tz! : 'reprehenderit',
    };
};

export const anAppointmentRescheduleAvailableDatesPayload = (overrides?: Partial<AppointmentRescheduleAvailableDatesPayload>): AppointmentRescheduleAvailableDatesPayload => {
    return {
        availableDates: overrides && overrides.hasOwnProperty('availableDates') ? overrides.availableDates! : [anAvailableRescheduleDate()],
    };
};

export const anAppointmentRescheduleAvailableTimesInput = (overrides?: Partial<AppointmentRescheduleAvailableTimesInput>): AppointmentRescheduleAvailableTimesInput => {
    return {
        appointmentId: overrides && overrides.hasOwnProperty('appointmentId') ? overrides.appointmentId! : 'b1a785fd-9210-4d37-9f24-fcd69eb00c0b',
        date: overrides && overrides.hasOwnProperty('date') ? overrides.date! : '2005-12-15',
        tz: overrides && overrides.hasOwnProperty('tz') ? overrides.tz! : 'odit',
    };
};

export const anAppointmentRescheduleAvailableTimesPayload = (overrides?: Partial<AppointmentRescheduleAvailableTimesPayload>): AppointmentRescheduleAvailableTimesPayload => {
    return {
        availableTimes: overrides && overrides.hasOwnProperty('availableTimes') ? overrides.availableTimes! : [anAvailableRescheduleTime()],
    };
};

export const anAppointmentRescheduleInput = (overrides?: Partial<AppointmentRescheduleInput>): AppointmentRescheduleInput => {
    return {
        appointmentId: overrides && overrides.hasOwnProperty('appointmentId') ? overrides.appointmentId! : '2e4e843f-1673-467d-a3aa-a36ecc385516',
        bookableTimeId: overrides && overrides.hasOwnProperty('bookableTimeId') ? overrides.bookableTimeId! : '28e2b239-d297-464a-9667-98a63923bcaa',
        sendNotification: overrides && overrides.hasOwnProperty('sendNotification') ? overrides.sendNotification! : false,
    };
};

export const anAppointmentReschedulePayload = (overrides?: Partial<AppointmentReschedulePayload>): AppointmentReschedulePayload => {
    return {
        appointment: overrides && overrides.hasOwnProperty('appointment') ? overrides.appointment! : anAppointment(),
    };
};

export const anAppointmentService = (overrides?: Partial<AppointmentService>): AppointmentService => {
    return {
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 7365,
        endAt: overrides && overrides.hasOwnProperty('endAt') ? overrides.endAt! : 'sit',
        price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 'rerum',
        service: overrides && overrides.hasOwnProperty('service') ? overrides.service! : aService(),
        serviceId: overrides && overrides.hasOwnProperty('serviceId') ? overrides.serviceId! : 'f7ecb84d-fbe0-4c4f-9d36-9b724982eb85',
        staff: overrides && overrides.hasOwnProperty('staff') ? overrides.staff! : aStaff(),
        staffId: overrides && overrides.hasOwnProperty('staffId') ? overrides.staffId! : 'b404d686-3ce5-4255-8382-6c7b6e35da22',
        staffRequested: overrides && overrides.hasOwnProperty('staffRequested') ? overrides.staffRequested! : true,
        startAt: overrides && overrides.hasOwnProperty('startAt') ? overrides.startAt! : 'magni',
        startTimeOffset: overrides && overrides.hasOwnProperty('startTimeOffset') ? overrides.startTimeOffset! : 2448,
        totalDuration: overrides && overrides.hasOwnProperty('totalDuration') ? overrides.totalDuration! : 7950,
    };
};

export const anAuthorizeCartOwnershipInput = (overrides?: Partial<AuthorizeCartOwnershipInput>): AuthorizeCartOwnershipInput => {
    return {
        cartId: overrides && overrides.hasOwnProperty('cartId') ? overrides.cartId! : 'exercitationem',
        clientAuthorizationCodeId: overrides && overrides.hasOwnProperty('clientAuthorizationCodeId') ? overrides.clientAuthorizationCodeId! : 'beatae',
        clientAuthorizationCodeValue: overrides && overrides.hasOwnProperty('clientAuthorizationCodeValue') ? overrides.clientAuthorizationCodeValue! : 6821,
    };
};

export const anAuthorizeCartOwnershipPayload = (overrides?: Partial<AuthorizeCartOwnershipPayload>): AuthorizeCartOwnershipPayload => {
    return {
        wasAuthorized: overrides && overrides.hasOwnProperty('wasAuthorized') ? overrides.wasAuthorized! : true,
    };
};

export const anAvailableRescheduleDate = (overrides?: Partial<AvailableRescheduleDate>): AvailableRescheduleDate => {
    return {
        date: overrides && overrides.hasOwnProperty('date') ? overrides.date! : '1973-06-11',
    };
};

export const anAvailableRescheduleTime = (overrides?: Partial<AvailableRescheduleTime>): AvailableRescheduleTime => {
    return {
        bookableTimeId: overrides && overrides.hasOwnProperty('bookableTimeId') ? overrides.bookableTimeId! : '61d361f7-0cff-48a4-9a45-0b51b581adb7',
        startTime: overrides && overrides.hasOwnProperty('startTime') ? overrides.startTime! : 'animi',
    };
};

export const aBookingQuestionOptionAnswerInput = (overrides?: Partial<BookingQuestionOptionAnswerInput>): BookingQuestionOptionAnswerInput => {
    return {
        optionId: overrides && overrides.hasOwnProperty('optionId') ? overrides.optionId! : '84ecae13-053c-40f8-99a1-182e51a11954',
    };
};

export const aBusiness = (overrides?: Partial<Business>): Business => {
    return {
        avatar: overrides && overrides.hasOwnProperty('avatar') ? overrides.avatar! : 'quod',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'a2f7ba36-84f2-49e7-a518-ec0b59b44903',
        insertedAt: overrides && overrides.hasOwnProperty('insertedAt') ? overrides.insertedAt! : 'qui',
        locations: overrides && overrides.hasOwnProperty('locations') ? overrides.locations! : aLocationConnection(),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'cumque',
        onlineGiftCardSettings: overrides && overrides.hasOwnProperty('onlineGiftCardSettings') ? overrides.onlineGiftCardSettings! : anOnlineGiftCardSettings(),
        tz: overrides && overrides.hasOwnProperty('tz') ? overrides.tz! : 'nisi',
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'ducimus',
        website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'molestias',
    };
};

export const aBusinessGiftCardDesign = (overrides?: Partial<BusinessGiftCardDesign>): BusinessGiftCardDesign => {
    return {
        design: overrides && overrides.hasOwnProperty('design') ? overrides.design! : aGiftCardDesign(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '752cd2fa-ae1a-459e-ae72-6a3b125a1b95',
        selected: overrides && overrides.hasOwnProperty('selected') ? overrides.selected! : true,
    };
};

export const aCalendarLinks = (overrides?: Partial<CalendarLinks>): CalendarLinks => {
    return {
        googleCalendar: overrides && overrides.hasOwnProperty('googleCalendar') ? overrides.googleCalendar! : 'beatae',
        icsDownload: overrides && overrides.hasOwnProperty('icsDownload') ? overrides.icsDownload! : 'totam',
        microsoftOffice: overrides && overrides.hasOwnProperty('microsoftOffice') ? overrides.microsoftOffice! : 'autem',
        microsoftOutlook: overrides && overrides.hasOwnProperty('microsoftOutlook') ? overrides.microsoftOutlook! : 'occaecati',
        yahooCalendar: overrides && overrides.hasOwnProperty('yahooCalendar') ? overrides.yahooCalendar! : 'nobis',
    };
};

export const aCancelAppointmentInput = (overrides?: Partial<CancelAppointmentInput>): CancelAppointmentInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '1e219241-a60f-411e-af71-63f2f6b2a81c',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'earum',
    };
};

export const aCancelAppointmentPayload = (overrides?: Partial<CancelAppointmentPayload>): CancelAppointmentPayload => {
    return {
        appointment: overrides && overrides.hasOwnProperty('appointment') ? overrides.appointment! : anAppointment(),
    };
};

export const aCart = (overrides?: Partial<Cart>): Cart => {
    return {
        advanceGratuity: overrides && overrides.hasOwnProperty('advanceGratuity') ? overrides.advanceGratuity! : aCartAdvanceGratuity(),
        availableCategories: overrides && overrides.hasOwnProperty('availableCategories') ? overrides.availableCategories! : [aCartAvailableCategory()],
        availableItem: overrides && overrides.hasOwnProperty('availableItem') ? overrides.availableItem! : aCartAvailableItem(),
        availablePaymentMethods: overrides && overrides.hasOwnProperty('availablePaymentMethods') ? overrides.availablePaymentMethods! : [aCartItemPaymentMethod()],
        bookingQuestions: overrides && overrides.hasOwnProperty('bookingQuestions') ? overrides.bookingQuestions! : [aCartBookingQuestion()],
        clientInformation: overrides && overrides.hasOwnProperty('clientInformation') ? overrides.clientInformation! : aCartClientInformation(),
        clientMessage: overrides && overrides.hasOwnProperty('clientMessage') ? overrides.clientMessage! : 'ea',
        completedAt: overrides && overrides.hasOwnProperty('completedAt') ? overrides.completedAt! : 'voluptas',
        endTime: overrides && overrides.hasOwnProperty('endTime') ? overrides.endTime! : 'maiores',
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [aCartError()],
        expiresAt: overrides && overrides.hasOwnProperty('expiresAt') ? overrides.expiresAt! : 'aut',
        features: overrides && overrides.hasOwnProperty('features') ? overrides.features! : aCartFeatures(),
        guests: overrides && overrides.hasOwnProperty('guests') ? overrides.guests! : [aCartGuest()],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '92ecd5c5-8738-44c0-808e-4fd12b86c7c2',
        insertedAt: overrides && overrides.hasOwnProperty('insertedAt') ? overrides.insertedAt! : 'quisquam',
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : aLocation(),
        offers: overrides && overrides.hasOwnProperty('offers') ? overrides.offers! : [aCartOffer()],
        selectedItem: overrides && overrides.hasOwnProperty('selectedItem') ? overrides.selectedItem! : aCartItem(),
        selectedItems: overrides && overrides.hasOwnProperty('selectedItems') ? overrides.selectedItems! : [aCartItem()],
        startTime: overrides && overrides.hasOwnProperty('startTime') ? overrides.startTime! : 'magni',
        startTimeId: overrides && overrides.hasOwnProperty('startTimeId') ? overrides.startTimeId! : '9f173804-87b8-47ec-9ff3-5ab6e9da9fc3',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : aCartSummary(),
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'qui',
    };
};

export const aCartAddToWaitlistInput = (overrides?: Partial<CartAddToWaitlistInput>): CartAddToWaitlistInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '09ce8d80-da71-4fea-a812-f6cc18db62df',
        preferredTimeLower: overrides && overrides.hasOwnProperty('preferredTimeLower') ? overrides.preferredTimeLower! : 'aut',
        preferredTimeUpper: overrides && overrides.hasOwnProperty('preferredTimeUpper') ? overrides.preferredTimeUpper! : 'maxime',
        tz: overrides && overrides.hasOwnProperty('tz') ? overrides.tz! : 'animi',
    };
};

export const aCartAddToWaitlistPayload = (overrides?: Partial<CartAddToWaitlistPayload>): CartAddToWaitlistPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aCartAdvanceGratuity = (overrides?: Partial<CartAdvanceGratuity>): CartAdvanceGratuity => {
    return {
        fixed: overrides && overrides.hasOwnProperty('fixed') ? overrides.fixed! : 'veniam',
        percentage: overrides && overrides.hasOwnProperty('percentage') ? overrides.percentage! : 4.21,
    };
};

export const aCartAdvanceGratuityInput = (overrides?: Partial<CartAdvanceGratuityInput>): CartAdvanceGratuityInput => {
    return {
        fixed: overrides && overrides.hasOwnProperty('fixed') ? overrides.fixed! : 'incidunt',
        percentage: overrides && overrides.hasOwnProperty('percentage') ? overrides.percentage! : 9.63,
    };
};

export const aCartAppointment = (overrides?: Partial<CartAppointment>): CartAppointment => {
    return {
        appointmentId: overrides && overrides.hasOwnProperty('appointmentId') ? overrides.appointmentId! : 'd2416b4e-4af9-4dee-909f-e7be31e1fb34',
        clientId: overrides && overrides.hasOwnProperty('clientId') ? overrides.clientId! : '0f384a23-d72a-4cbe-80f5-e926c2ecbd10',
        forCartOwner: overrides && overrides.hasOwnProperty('forCartOwner') ? overrides.forCartOwner! : false,
    };
};

export const aCartAvailableBookableItem = (overrides?: Partial<CartAvailableBookableItem>): CartAvailableBookableItem => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'a',
        disabled: overrides && overrides.hasOwnProperty('disabled') ? overrides.disabled! : true,
        disabledDescription: overrides && overrides.hasOwnProperty('disabledDescription') ? overrides.disabledDescription! : 'quia',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '79531cd2-de03-4ac4-bdcc-ea3b8d4d6451',
        listDuration: overrides && overrides.hasOwnProperty('listDuration') ? overrides.listDuration! : 7765,
        listDurationRange: overrides && overrides.hasOwnProperty('listDurationRange') ? overrides.listDurationRange! : aCartDurationRange(),
        listPrice: overrides && overrides.hasOwnProperty('listPrice') ? overrides.listPrice! : 'non',
        listPriceRange: overrides && overrides.hasOwnProperty('listPriceRange') ? overrides.listPriceRange! : aCartPriceRange(),
        locationVariants: overrides && overrides.hasOwnProperty('locationVariants') ? overrides.locationVariants! : [aCartAvailableBookableItemLocationVariant()],
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'magnam',
        optionGroups: overrides && overrides.hasOwnProperty('optionGroups') ? overrides.optionGroups! : [aCartAvailableBookableItemOptionGroup()],
        staffVariants: overrides && overrides.hasOwnProperty('staffVariants') ? overrides.staffVariants! : [aCartAvailableBookableItemStaffVariant()],
        variableDuration: overrides && overrides.hasOwnProperty('variableDuration') ? overrides.variableDuration! : false,
        variablePrice: overrides && overrides.hasOwnProperty('variablePrice') ? overrides.variablePrice! : false,
    };
};

export const aCartAvailableBookableItemLocationVariant = (overrides?: Partial<CartAvailableBookableItemLocationVariant>): CartAvailableBookableItemLocationVariant => {
    return {
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : aLocation(),
    };
};

export const aCartAvailableBookableItemOption = (overrides?: Partial<CartAvailableBookableItemOption>): CartAvailableBookableItemOption => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'deleniti',
        durationDelta: overrides && overrides.hasOwnProperty('durationDelta') ? overrides.durationDelta! : 9113,
        groupId: overrides && overrides.hasOwnProperty('groupId') ? overrides.groupId! : 'c454717e-a849-41a4-84bb-bcdcdb77da0e',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '90910e46-79cc-4f97-a2b9-ab8e83743ec4',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'rem',
        priceDelta: overrides && overrides.hasOwnProperty('priceDelta') ? overrides.priceDelta! : 'porro',
    };
};

export const aCartAvailableBookableItemOptionGroup = (overrides?: Partial<CartAvailableBookableItemOptionGroup>): CartAvailableBookableItemOptionGroup => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'et',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '460f24eb-9c5a-4d90-b55d-f0bf9c3c0828',
        maxLimit: overrides && overrides.hasOwnProperty('maxLimit') ? overrides.maxLimit! : 8470,
        minLimit: overrides && overrides.hasOwnProperty('minLimit') ? overrides.minLimit! : 6055,
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'ut',
        options: overrides && overrides.hasOwnProperty('options') ? overrides.options! : [aCartAvailableBookableItemOption()],
    };
};

export const aCartAvailableBookableItemStaffVariant = (overrides?: Partial<CartAvailableBookableItemStaffVariant>): CartAvailableBookableItemStaffVariant => {
    return {
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 2800,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ad723bea-e9f9-479f-b39c-682a5215c446',
        price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 'dicta',
        staff: overrides && overrides.hasOwnProperty('staff') ? overrides.staff! : aStaff(),
    };
};

export const aCartAvailableCategory = (overrides?: Partial<CartAvailableCategory>): CartAvailableCategory => {
    return {
        availableItems: overrides && overrides.hasOwnProperty('availableItems') ? overrides.availableItems! : [aCartAvailableItem()],
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'perspiciatis',
        disabled: overrides && overrides.hasOwnProperty('disabled') ? overrides.disabled! : true,
        disabledDescription: overrides && overrides.hasOwnProperty('disabledDescription') ? overrides.disabledDescription! : 'sit',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '8a2c88f9-f92c-418d-8841-ed90383d6e7b',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'minima',
    };
};

export const aCartAvailableGiftCardItem = (overrides?: Partial<CartAvailableGiftCardItem>): CartAvailableGiftCardItem => {
    return {
        allowCustomAmounts: overrides && overrides.hasOwnProperty('allowCustomAmounts') ? overrides.allowCustomAmounts! : true,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'voluptas',
        disabled: overrides && overrides.hasOwnProperty('disabled') ? overrides.disabled! : false,
        disabledDescription: overrides && overrides.hasOwnProperty('disabledDescription') ? overrides.disabledDescription! : 'et',
        giftCardMax: overrides && overrides.hasOwnProperty('giftCardMax') ? overrides.giftCardMax! : 'numquam',
        giftCardMin: overrides && overrides.hasOwnProperty('giftCardMin') ? overrides.giftCardMin! : 'laborum',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '5fac2110-f408-4b35-8bb5-0e064f22863f',
        listPrice: overrides && overrides.hasOwnProperty('listPrice') ? overrides.listPrice! : 'qui',
        listPriceRange: overrides && overrides.hasOwnProperty('listPriceRange') ? overrides.listPriceRange! : aCartPriceRange(),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'explicabo',
        pricePresets: overrides && overrides.hasOwnProperty('pricePresets') ? overrides.pricePresets! : ['animi'],
    };
};

export const aCartAvailableItem = (overrides?: Partial<CartAvailableItem>): CartAvailableItem => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'architecto',
        disabled: overrides && overrides.hasOwnProperty('disabled') ? overrides.disabled! : true,
        disabledDescription: overrides && overrides.hasOwnProperty('disabledDescription') ? overrides.disabledDescription! : 'assumenda',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '6ff19028-4742-4516-b396-5789d977ca86',
        listPrice: overrides && overrides.hasOwnProperty('listPrice') ? overrides.listPrice! : 'sint',
        listPriceRange: overrides && overrides.hasOwnProperty('listPriceRange') ? overrides.listPriceRange! : aCartPriceRange(),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'assumenda',
    };
};

export const aCartAvailablePurchasableItem = (overrides?: Partial<CartAvailablePurchasableItem>): CartAvailablePurchasableItem => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'harum',
        disabled: overrides && overrides.hasOwnProperty('disabled') ? overrides.disabled! : false,
        disabledDescription: overrides && overrides.hasOwnProperty('disabledDescription') ? overrides.disabledDescription! : 'sit',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'fb3e5138-2a5b-4eb3-94ba-7dcc04649423',
        listPrice: overrides && overrides.hasOwnProperty('listPrice') ? overrides.listPrice! : 'est',
        listPriceRange: overrides && overrides.hasOwnProperty('listPriceRange') ? overrides.listPriceRange! : aCartPriceRange(),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'deserunt',
    };
};

export const aCartBookableDate = (overrides?: Partial<CartBookableDate>): CartBookableDate => {
    return {
        date: overrides && overrides.hasOwnProperty('date') ? overrides.date! : '1976-12-26',
    };
};

export const aCartBookableItem = (overrides?: Partial<CartBookableItem>): CartBookableItem => {
    return {
        availablePaymentMethods: overrides && overrides.hasOwnProperty('availablePaymentMethods') ? overrides.availablePaymentMethods! : [aCartItemPaymentMethod()],
        discountAmount: overrides && overrides.hasOwnProperty('discountAmount') ? overrides.discountAmount! : 'nulla',
        discountCode: overrides && overrides.hasOwnProperty('discountCode') ? overrides.discountCode! : 'nam',
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [aCartItemError()],
        guest: overrides && overrides.hasOwnProperty('guest') ? overrides.guest! : aCartGuest(),
        guestId: overrides && overrides.hasOwnProperty('guestId') ? overrides.guestId! : '0d728340-acb2-4e08-922f-85bf1f47343a',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'e9658e65-ef71-4cd0-88bf-9f693da66f61',
        item: overrides && overrides.hasOwnProperty('item') ? overrides.item! : aCartAvailableBookableItem(),
        lineTotal: overrides && overrides.hasOwnProperty('lineTotal') ? overrides.lineTotal! : 'suscipit',
        price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 'repudiandae',
        selectedOptions: overrides && overrides.hasOwnProperty('selectedOptions') ? overrides.selectedOptions! : [aCartAvailableBookableItemOption()],
        selectedPaymentMethod: overrides && overrides.hasOwnProperty('selectedPaymentMethod') ? overrides.selectedPaymentMethod! : aCartItemPaymentMethod(),
        selectedStaffVariant: overrides && overrides.hasOwnProperty('selectedStaffVariant') ? overrides.selectedStaffVariant! : aCartAvailableBookableItemStaffVariant(),
        startTime: overrides && overrides.hasOwnProperty('startTime') ? overrides.startTime! : 'animi',
        taxAmount: overrides && overrides.hasOwnProperty('taxAmount') ? overrides.taxAmount! : 'aliquam',
    };
};

export const aCartBookableTime = (overrides?: Partial<CartBookableTime>): CartBookableTime => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'fbe82808-aa98-4c7f-b7e1-3d123d4f7b2a',
        score: overrides && overrides.hasOwnProperty('score') ? overrides.score! : 6.24,
        startTime: overrides && overrides.hasOwnProperty('startTime') ? overrides.startTime! : 'ut',
    };
};

export const aCartBookingQuestion = (overrides?: Partial<CartBookingQuestion>): CartBookingQuestion => {
    return {
        answer: overrides && overrides.hasOwnProperty('answer') ? overrides.answer! : aCartBookingQuestionBooleanAnswer(),
        displayType: overrides && overrides.hasOwnProperty('displayType') ? overrides.displayType! : CartBookingQuestionDisplayType.Boolean,
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : ['facilis'],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '82d3901e-c9f8-42fb-a054-0da101143cd9',
        key: overrides && overrides.hasOwnProperty('key') ? overrides.key! : 'aut',
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : 'ratione',
        options: overrides && overrides.hasOwnProperty('options') ? overrides.options! : [aCartBookingQuestionOption()],
        required: overrides && overrides.hasOwnProperty('required') ? overrides.required! : false,
        schema: overrides && overrides.hasOwnProperty('schema') ? overrides.schema! : CartBookingQuestionSchema.Appointment,
        valueType: overrides && overrides.hasOwnProperty('valueType') ? overrides.valueType! : CartBookingQuestionValueType.Boolean,
    };
};

export const aCartBookingQuestionAddAnswerInput = (overrides?: Partial<CartBookingQuestionAddAnswerInput>): CartBookingQuestionAddAnswerInput => {
    return {
        answer: overrides && overrides.hasOwnProperty('answer') ? overrides.answer! : aCartBookingQuestionAnswerInput(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ee6ef44e-87a8-4e77-805f-07895920f80f',
        questionId: overrides && overrides.hasOwnProperty('questionId') ? overrides.questionId! : '36c7a0ad-eb38-4af5-9a90-c8a0fe9810e4',
    };
};

export const aCartBookingQuestionAddAnswerPayload = (overrides?: Partial<CartBookingQuestionAddAnswerPayload>): CartBookingQuestionAddAnswerPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aCartBookingQuestionAnswerInput = (overrides?: Partial<CartBookingQuestionAnswerInput>): CartBookingQuestionAnswerInput => {
    return {
        booleanValue: overrides && overrides.hasOwnProperty('booleanValue') ? overrides.booleanValue! : false,
        datetimeValue: overrides && overrides.hasOwnProperty('datetimeValue') ? overrides.datetimeValue! : 'unde',
        floatValue: overrides && overrides.hasOwnProperty('floatValue') ? overrides.floatValue! : 3.91,
        integerValue: overrides && overrides.hasOwnProperty('integerValue') ? overrides.integerValue! : 3002,
        optionValue: overrides && overrides.hasOwnProperty('optionValue') ? overrides.optionValue! : aBookingQuestionOptionAnswerInput(),
        optionValues: overrides && overrides.hasOwnProperty('optionValues') ? overrides.optionValues! : [aBookingQuestionOptionAnswerInput()],
        textValue: overrides && overrides.hasOwnProperty('textValue') ? overrides.textValue! : 'nulla',
    };
};

export const aCartBookingQuestionBooleanAnswer = (overrides?: Partial<CartBookingQuestionBooleanAnswer>): CartBookingQuestionBooleanAnswer => {
    return {
        booleanValue: overrides && overrides.hasOwnProperty('booleanValue') ? overrides.booleanValue! : true,
    };
};

export const aCartBookingQuestionClearAnswerInput = (overrides?: Partial<CartBookingQuestionClearAnswerInput>): CartBookingQuestionClearAnswerInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '9e678885-374f-40e6-ac6a-96c027ab5480',
        questionId: overrides && overrides.hasOwnProperty('questionId') ? overrides.questionId! : '617b57a1-9351-4580-bcb1-7b66589f1e3f',
    };
};

export const aCartBookingQuestionClearAnswerPayload = (overrides?: Partial<CartBookingQuestionClearAnswerPayload>): CartBookingQuestionClearAnswerPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aCartBookingQuestionDatetimeAnswer = (overrides?: Partial<CartBookingQuestionDatetimeAnswer>): CartBookingQuestionDatetimeAnswer => {
    return {
        datetimeValue: overrides && overrides.hasOwnProperty('datetimeValue') ? overrides.datetimeValue! : 'eveniet',
    };
};

export const aCartBookingQuestionFloatAnswer = (overrides?: Partial<CartBookingQuestionFloatAnswer>): CartBookingQuestionFloatAnswer => {
    return {
        floatValue: overrides && overrides.hasOwnProperty('floatValue') ? overrides.floatValue! : 2.74,
    };
};

export const aCartBookingQuestionIntegerAnswer = (overrides?: Partial<CartBookingQuestionIntegerAnswer>): CartBookingQuestionIntegerAnswer => {
    return {
        integerValue: overrides && overrides.hasOwnProperty('integerValue') ? overrides.integerValue! : 5568,
    };
};

export const aCartBookingQuestionMultiSelectAnswer = (overrides?: Partial<CartBookingQuestionMultiSelectAnswer>): CartBookingQuestionMultiSelectAnswer => {
    return {
        options: overrides && overrides.hasOwnProperty('options') ? overrides.options! : [aCartBookingQuestionOption()],
    };
};

export const aCartBookingQuestionOption = (overrides?: Partial<CartBookingQuestionOption>): CartBookingQuestionOption => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'cd9f7dc2-16cd-4a30-815a-b7b2c9ed7d48',
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : 'eius',
    };
};

export const aCartBookingQuestionSelectAnswer = (overrides?: Partial<CartBookingQuestionSelectAnswer>): CartBookingQuestionSelectAnswer => {
    return {
        option: overrides && overrides.hasOwnProperty('option') ? overrides.option! : aCartBookingQuestionOption(),
    };
};

export const aCartBookingQuestionTextAnswer = (overrides?: Partial<CartBookingQuestionTextAnswer>): CartBookingQuestionTextAnswer => {
    return {
        textValue: overrides && overrides.hasOwnProperty('textValue') ? overrides.textValue! : 'eius',
    };
};

export const aCartClearInput = (overrides?: Partial<CartClearInput>): CartClearInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '6a3a071e-ac4a-402d-bc3e-172db90282c2',
    };
};

export const aCartClearPayload = (overrides?: Partial<CartClearPayload>): CartClearPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aCartClientInformation = (overrides?: Partial<CartClientInformation>): CartClientInformation => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'alias',
        externalId: overrides && overrides.hasOwnProperty('externalId') ? overrides.externalId! : 'cupiditate',
        firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'quis',
        lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'sit',
        phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'unde',
    };
};

export const aCartClientInformationInput = (overrides?: Partial<CartClientInformationInput>): CartClientInformationInput => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'porro',
        externalId: overrides && overrides.hasOwnProperty('externalId') ? overrides.externalId! : 'ut',
        firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'temporibus',
        lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'in',
        phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'labore',
    };
};

export const aCartDurationRange = (overrides?: Partial<CartDurationRange>): CartDurationRange => {
    return {
        max: overrides && overrides.hasOwnProperty('max') ? overrides.max! : 2453,
        min: overrides && overrides.hasOwnProperty('min') ? overrides.min! : 6965,
        variable: overrides && overrides.hasOwnProperty('variable') ? overrides.variable! : false,
    };
};

export const aCartError = (overrides?: Partial<CartError>): CartError => {
    return {
        code: overrides && overrides.hasOwnProperty('code') ? overrides.code! : CartErrorCode.CartBookingQuestionAnswerMissing,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'omnis',
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'est',
    };
};

export const aCartFeatures = (overrides?: Partial<CartFeatures>): CartFeatures => {
    return {
        bookingQuestionsEnabled: overrides && overrides.hasOwnProperty('bookingQuestionsEnabled') ? overrides.bookingQuestionsEnabled! : true,
        giftCardPurchaseEnabled: overrides && overrides.hasOwnProperty('giftCardPurchaseEnabled') ? overrides.giftCardPurchaseEnabled! : true,
        paymentInfoRequired: overrides && overrides.hasOwnProperty('paymentInfoRequired') ? overrides.paymentInfoRequired! : false,
    };
};

export const aCartGiftCardItem = (overrides?: Partial<CartGiftCardItem>): CartGiftCardItem => {
    return {
        availablePaymentMethods: overrides && overrides.hasOwnProperty('availablePaymentMethods') ? overrides.availablePaymentMethods! : [aCartItemPaymentMethod()],
        discountAmount: overrides && overrides.hasOwnProperty('discountAmount') ? overrides.discountAmount! : 'excepturi',
        discountCode: overrides && overrides.hasOwnProperty('discountCode') ? overrides.discountCode! : 'nemo',
        emailFulfillment: overrides && overrides.hasOwnProperty('emailFulfillment') ? overrides.emailFulfillment! : aCartItemEmailFulfillment(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [aCartItemError()],
        giftCardDesign: overrides && overrides.hasOwnProperty('giftCardDesign') ? overrides.giftCardDesign! : aCartItemGiftCardDesign(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'fd6c0653-c6b9-46b5-8261-f041c0e65446',
        item: overrides && overrides.hasOwnProperty('item') ? overrides.item! : aCartAvailableGiftCardItem(),
        lineTotal: overrides && overrides.hasOwnProperty('lineTotal') ? overrides.lineTotal! : 'et',
        price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 'impedit',
        selectedPaymentMethod: overrides && overrides.hasOwnProperty('selectedPaymentMethod') ? overrides.selectedPaymentMethod! : aCartItemPaymentMethod(),
        taxAmount: overrides && overrides.hasOwnProperty('taxAmount') ? overrides.taxAmount! : 'dignissimos',
    };
};

export const aCartGuest = (overrides?: Partial<CartGuest>): CartGuest => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'excepturi',
        firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'aut',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'e99ad070-8cef-41ce-b0d5-9829b8cf9a84',
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : 'atque',
        lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'illo',
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 2555,
        phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'consequatur',
    };
};

export const aCartItem = (overrides?: Partial<CartItem>): CartItem => {
    return {
        availablePaymentMethods: overrides && overrides.hasOwnProperty('availablePaymentMethods') ? overrides.availablePaymentMethods! : [aCartItemPaymentMethod()],
        discountAmount: overrides && overrides.hasOwnProperty('discountAmount') ? overrides.discountAmount! : 'adipisci',
        discountCode: overrides && overrides.hasOwnProperty('discountCode') ? overrides.discountCode! : 'ea',
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [aCartItemError()],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'c0a6e20d-ac48-4d0f-b244-16be13b393de',
        item: overrides && overrides.hasOwnProperty('item') ? overrides.item! : aCartAvailableItem(),
        lineTotal: overrides && overrides.hasOwnProperty('lineTotal') ? overrides.lineTotal! : 'quasi',
        price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 'molestiae',
        selectedPaymentMethod: overrides && overrides.hasOwnProperty('selectedPaymentMethod') ? overrides.selectedPaymentMethod! : aCartItemPaymentMethod(),
        taxAmount: overrides && overrides.hasOwnProperty('taxAmount') ? overrides.taxAmount! : 'est',
    };
};

export const aCartItemCardPaymentMethod = (overrides?: Partial<CartItemCardPaymentMethod>): CartItemCardPaymentMethod => {
    return {
        cardBrand: overrides && overrides.hasOwnProperty('cardBrand') ? overrides.cardBrand! : 'voluptas',
        cardExpMonth: overrides && overrides.hasOwnProperty('cardExpMonth') ? overrides.cardExpMonth! : 9251,
        cardExpYear: overrides && overrides.hasOwnProperty('cardExpYear') ? overrides.cardExpYear! : 1037,
        cardHolder: overrides && overrides.hasOwnProperty('cardHolder') ? overrides.cardHolder! : 'quos',
        cardIsDefault: overrides && overrides.hasOwnProperty('cardIsDefault') ? overrides.cardIsDefault! : false,
        cardLast4: overrides && overrides.hasOwnProperty('cardLast4') ? overrides.cardLast4! : 'corrupti',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '012384a6-5e8b-4116-8656-60f062983a79',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'fugit',
    };
};

export const aCartItemEmailFulfillment = (overrides?: Partial<CartItemEmailFulfillment>): CartItemEmailFulfillment => {
    return {
        deliveryDate: overrides && overrides.hasOwnProperty('deliveryDate') ? overrides.deliveryDate! : '1991-05-15',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '485d1fc1-e2eb-4708-a3b5-db85cb8c61ff',
        messageFromSender: overrides && overrides.hasOwnProperty('messageFromSender') ? overrides.messageFromSender! : 'perspiciatis',
        recipientEmail: overrides && overrides.hasOwnProperty('recipientEmail') ? overrides.recipientEmail! : 'vel',
        recipientName: overrides && overrides.hasOwnProperty('recipientName') ? overrides.recipientName! : 'quis',
        senderName: overrides && overrides.hasOwnProperty('senderName') ? overrides.senderName! : 'totam',
    };
};

export const aCartItemError = (overrides?: Partial<CartItemError>): CartItemError => {
    return {
        code: overrides && overrides.hasOwnProperty('code') ? overrides.code! : CartItemErrorCode.CartMissingItemPaymentMethod,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'veritatis',
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'sit',
    };
};

export const aCartItemGiftCardDesign = (overrides?: Partial<CartItemGiftCardDesign>): CartItemGiftCardDesign => {
    return {
        backgroundColor: overrides && overrides.hasOwnProperty('backgroundColor') ? overrides.backgroundColor! : 'ut',
        foregroundText: overrides && overrides.hasOwnProperty('foregroundText') ? overrides.foregroundText! : 'aut',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'c3487924-d5ed-42ef-858f-2dd3d200719a',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : 'cum',
    };
};

export const aCartItemPaymentMethod = (overrides?: Partial<CartItemPaymentMethod>): CartItemPaymentMethod => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ad35f645-97e1-48cf-9e6c-3770fa05c9ed',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'ut',
    };
};

export const aCartItemVoucherPaymentMethod = (overrides?: Partial<CartItemVoucherPaymentMethod>): CartItemVoucherPaymentMethod => {
    return {
        availableCount: overrides && overrides.hasOwnProperty('availableCount') ? overrides.availableCount! : 9164,
        expiresOn: overrides && overrides.hasOwnProperty('expiresOn') ? overrides.expiresOn! : '2014-04-13',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '0db55573-7ecd-4d87-9b88-5ac430da015a',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'qui',
    };
};

export const aCartOffer = (overrides?: Partial<CartOffer>): CartOffer => {
    return {
        applied: overrides && overrides.hasOwnProperty('applied') ? overrides.applied! : false,
        code: overrides && overrides.hasOwnProperty('code') ? overrides.code! : 'qui',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '4981842e-0768-4e79-8f14-b58322dc971a',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'temporibus',
    };
};

export const aCartPriceRange = (overrides?: Partial<CartPriceRange>): CartPriceRange => {
    return {
        max: overrides && overrides.hasOwnProperty('max') ? overrides.max! : 'et',
        min: overrides && overrides.hasOwnProperty('min') ? overrides.min! : 'ipsa',
        variable: overrides && overrides.hasOwnProperty('variable') ? overrides.variable! : false,
    };
};

export const aCartPurchasableItem = (overrides?: Partial<CartPurchasableItem>): CartPurchasableItem => {
    return {
        availablePaymentMethods: overrides && overrides.hasOwnProperty('availablePaymentMethods') ? overrides.availablePaymentMethods! : [aCartItemPaymentMethod()],
        discountAmount: overrides && overrides.hasOwnProperty('discountAmount') ? overrides.discountAmount! : 'id',
        discountCode: overrides && overrides.hasOwnProperty('discountCode') ? overrides.discountCode! : 'odio',
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [aCartItemError()],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '3df93967-ad48-408f-b92e-a66c42d471a6',
        item: overrides && overrides.hasOwnProperty('item') ? overrides.item! : aCartAvailablePurchasableItem(),
        lineTotal: overrides && overrides.hasOwnProperty('lineTotal') ? overrides.lineTotal! : 'eum',
        price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 'eveniet',
        selectedPaymentMethod: overrides && overrides.hasOwnProperty('selectedPaymentMethod') ? overrides.selectedPaymentMethod! : aCartItemPaymentMethod(),
        taxAmount: overrides && overrides.hasOwnProperty('taxAmount') ? overrides.taxAmount! : 'qui',
    };
};

export const aCartSetLocationInput = (overrides?: Partial<CartSetLocationInput>): CartSetLocationInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '5e4ba3c6-d1e6-463e-89e3-72781101dcbc',
        locationId: overrides && overrides.hasOwnProperty('locationId') ? overrides.locationId! : 'a8157f74-51ab-4e9a-bff5-2a8fcab7513c',
    };
};

export const aCartSetLocationPayload = (overrides?: Partial<CartSetLocationPayload>): CartSetLocationPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aCartSummary = (overrides?: Partial<CartSummary>): CartSummary => {
    return {
        deposit: overrides && overrides.hasOwnProperty('deposit') ? overrides.deposit! : DepositType.FullDeposit,
        depositAmount: overrides && overrides.hasOwnProperty('depositAmount') ? overrides.depositAmount! : 'blanditiis',
        discountAmount: overrides && overrides.hasOwnProperty('discountAmount') ? overrides.discountAmount! : 'sed',
        gratuityAmount: overrides && overrides.hasOwnProperty('gratuityAmount') ? overrides.gratuityAmount! : 'quia',
        paymentMethodRequired: overrides && overrides.hasOwnProperty('paymentMethodRequired') ? overrides.paymentMethodRequired! : false,
        roundingAmount: overrides && overrides.hasOwnProperty('roundingAmount') ? overrides.roundingAmount! : 'et',
        subtotal: overrides && overrides.hasOwnProperty('subtotal') ? overrides.subtotal! : 'quis',
        taxAmount: overrides && overrides.hasOwnProperty('taxAmount') ? overrides.taxAmount! : 'a',
        total: overrides && overrides.hasOwnProperty('total') ? overrides.total! : 'ducimus',
    };
};

export const aCheckoutCartInput = (overrides?: Partial<CheckoutCartInput>): CheckoutCartInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '6e9ccdf8-a952-454c-817e-c88cdfc53f80',
    };
};

export const aCheckoutCartPayload = (overrides?: Partial<CheckoutCartPayload>): CheckoutCartPayload => {
    return {
        appointments: overrides && overrides.hasOwnProperty('appointments') ? overrides.appointments! : [aCartAppointment()],
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aClient = (overrides?: Partial<Client>): Client => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'molestias',
        firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'eaque',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'c884717e-580f-4651-a68e-705d18cd7f0e',
        insertedAt: overrides && overrides.hasOwnProperty('insertedAt') ? overrides.insertedAt! : 'officia',
        lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'perspiciatis',
        mobilePhone: overrides && overrides.hasOwnProperty('mobilePhone') ? overrides.mobilePhone! : 'rerum',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'nihil',
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'ut',
    };
};

export const aCreateCartGiftCardItemEmailFulfillmentInput = (overrides?: Partial<CreateCartGiftCardItemEmailFulfillmentInput>): CreateCartGiftCardItemEmailFulfillmentInput => {
    return {
        deliveryDate: overrides && overrides.hasOwnProperty('deliveryDate') ? overrides.deliveryDate! : '2001-04-25',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'a42f1a85-0f55-48a7-95cd-918a7d0ce82e',
        itemId: overrides && overrides.hasOwnProperty('itemId') ? overrides.itemId! : '6df8c5a0-66ae-472d-95d3-fd5dee41d9e6',
        messageFromSender: overrides && overrides.hasOwnProperty('messageFromSender') ? overrides.messageFromSender! : 'molestiae',
        recipientEmail: overrides && overrides.hasOwnProperty('recipientEmail') ? overrides.recipientEmail! : 'harum',
        recipientName: overrides && overrides.hasOwnProperty('recipientName') ? overrides.recipientName! : 'maiores',
        senderName: overrides && overrides.hasOwnProperty('senderName') ? overrides.senderName! : 'doloribus',
    };
};

export const aCreateCartGiftCardItemEmailFulfillmentPayload = (overrides?: Partial<CreateCartGiftCardItemEmailFulfillmentPayload>): CreateCartGiftCardItemEmailFulfillmentPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
        emailFulfillment: overrides && overrides.hasOwnProperty('emailFulfillment') ? overrides.emailFulfillment! : aCartItemEmailFulfillment(),
    };
};

export const aCreateCartGuestInput = (overrides?: Partial<CreateCartGuestInput>): CreateCartGuestInput => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'illum',
        firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'ratione',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '7d2a124b-ca45-42ce-b3e8-59fbf3793f6c',
        lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'sapiente',
        phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'quod',
    };
};

export const aCreateCartGuestPayload = (overrides?: Partial<CreateCartGuestPayload>): CreateCartGuestPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
        guest: overrides && overrides.hasOwnProperty('guest') ? overrides.guest! : aCartGuest(),
    };
};

export const aCreateCartInput = (overrides?: Partial<CreateCartInput>): CreateCartInput => {
    return {
        advanceGratuity: overrides && overrides.hasOwnProperty('advanceGratuity') ? overrides.advanceGratuity! : aCartAdvanceGratuityInput(),
        clientInformation: overrides && overrides.hasOwnProperty('clientInformation') ? overrides.clientInformation! : aCartClientInformationInput(),
        clientMessage: overrides && overrides.hasOwnProperty('clientMessage') ? overrides.clientMessage! : 'consequatur',
        discountCode: overrides && overrides.hasOwnProperty('discountCode') ? overrides.discountCode! : 'cumque',
        locationId: overrides && overrides.hasOwnProperty('locationId') ? overrides.locationId! : '72d57caf-a053-423a-884f-644b8bbfec80',
        referralSource: overrides && overrides.hasOwnProperty('referralSource') ? overrides.referralSource! : 'omnis',
    };
};

export const aCreateCartPayload = (overrides?: Partial<CreateCartPayload>): CreateCartPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aDeleteCartGiftCardItemEmailFulfillmentInput = (overrides?: Partial<DeleteCartGiftCardItemEmailFulfillmentInput>): DeleteCartGiftCardItemEmailFulfillmentInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'efff04a9-263c-4776-ab02-e54d829b7913',
        itemId: overrides && overrides.hasOwnProperty('itemId') ? overrides.itemId! : 'c8047555-e600-4f4d-86cd-303dfb80edab',
    };
};

export const aDeleteCartGiftCardItemEmailFulfillmentPayload = (overrides?: Partial<DeleteCartGiftCardItemEmailFulfillmentPayload>): DeleteCartGiftCardItemEmailFulfillmentPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aDeleteCartGuestInput = (overrides?: Partial<DeleteCartGuestInput>): DeleteCartGuestInput => {
    return {
        guestId: overrides && overrides.hasOwnProperty('guestId') ? overrides.guestId! : '059a9393-1d00-4710-8353-9709308ac23a',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'c93b9cd1-a36b-4892-8065-02f0fd45f50b',
    };
};

export const aDeleteCartGuestPayload = (overrides?: Partial<DeleteCartGuestPayload>): DeleteCartGuestPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aGiftCardDesign = (overrides?: Partial<GiftCardDesign>): GiftCardDesign => {
    return {
        backgroundColor: overrides && overrides.hasOwnProperty('backgroundColor') ? overrides.backgroundColor! : 'quasi',
        foregroundText: overrides && overrides.hasOwnProperty('foregroundText') ? overrides.foregroundText! : 'est',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'f216822a-9565-403c-a951-481344cfba48',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : 'itaque',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'enim',
        preset: overrides && overrides.hasOwnProperty('preset') ? overrides.preset! : false,
    };
};

export const aLocation = (overrides?: Partial<Location>): Location => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : anAddress(),
        avatar: overrides && overrides.hasOwnProperty('avatar') ? overrides.avatar! : 'aut',
        businessName: overrides && overrides.hasOwnProperty('businessName') ? overrides.businessName! : 'dolores',
        coordinates: overrides && overrides.hasOwnProperty('coordinates') ? overrides.coordinates! : 'velit',
        externalId: overrides && overrides.hasOwnProperty('externalId') ? overrides.externalId! : 'ratione',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'bfe52c08-bd42-41df-a3d4-364c80b41fe8',
        insertedAt: overrides && overrides.hasOwnProperty('insertedAt') ? overrides.insertedAt! : 'vitae',
        isRemote: overrides && overrides.hasOwnProperty('isRemote') ? overrides.isRemote! : true,
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'optio',
        phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'et',
        tz: overrides && overrides.hasOwnProperty('tz') ? overrides.tz! : 'consectetur',
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'culpa',
    };
};

export const aLocationConnection = (overrides?: Partial<LocationConnection>): LocationConnection => {
    return {
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aLocationEdge()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aLocationEdge = (overrides?: Partial<LocationEdge>): LocationEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'illum',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aLocation(),
    };
};

export const aMembership = (overrides?: Partial<Membership>): Membership => {
    return {
        client: overrides && overrides.hasOwnProperty('client') ? overrides.client! : aClient(),
        clientId: overrides && overrides.hasOwnProperty('clientId') ? overrides.clientId! : '4a0aac29-d66f-41b4-a7dc-ca42db940921',
        endOn: overrides && overrides.hasOwnProperty('endOn') ? overrides.endOn! : '2003-03-24',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'cf18c1f2-8e7d-4a3d-a70d-a877d24df604',
        interval: overrides && overrides.hasOwnProperty('interval') ? overrides.interval! : 'laboriosam',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'ut',
        startOn: overrides && overrides.hasOwnProperty('startOn') ? overrides.startOn! : '1999-01-30',
        status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : SubscriptionStatus.Active,
        termNumber: overrides && overrides.hasOwnProperty('termNumber') ? overrides.termNumber! : 5333,
        vouchers: overrides && overrides.hasOwnProperty('vouchers') ? overrides.vouchers! : [aMembershipVoucher()],
    };
};

export const aMembershipConnection = (overrides?: Partial<MembershipConnection>): MembershipConnection => {
    return {
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aMembershipEdge()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    };
};

export const aMembershipEdge = (overrides?: Partial<MembershipEdge>): MembershipEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'voluptatum',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aMembership(),
    };
};

export const aMembershipVoucher = (overrides?: Partial<MembershipVoucher>): MembershipVoucher => {
    return {
        quantity: overrides && overrides.hasOwnProperty('quantity') ? overrides.quantity! : 2981,
        service: overrides && overrides.hasOwnProperty('service') ? overrides.service! : aService(),
        services: overrides && overrides.hasOwnProperty('services') ? overrides.services! : [aService()],
    };
};

export const aNode = (overrides?: Partial<Node>): Node => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '95bb2f34-6c86-495f-bfdc-f25b025cdba5',
    };
};

export const anOnlineGiftCardSettings = (overrides?: Partial<OnlineGiftCardSettings>): OnlineGiftCardSettings => {
    return {
        giftCardDesigns: overrides && overrides.hasOwnProperty('giftCardDesigns') ? overrides.giftCardDesigns! : [aBusinessGiftCardDesign()],
        designatedLocationId: overrides && overrides.hasOwnProperty('designatedLocationId') ? overrides.designatedLocationId! : '696ad8e2-21ba-4718-aea9-263e362c84d5',
        websiteMessage: overrides && overrides.hasOwnProperty('websiteMessage') ? overrides.websiteMessage! : 'beatae',
    };
};

export const aPageInfo = (overrides?: Partial<PageInfo>): PageInfo => {
    return {
        endCursor: overrides && overrides.hasOwnProperty('endCursor') ? overrides.endCursor! : 'id',
        hasNextPage: overrides && overrides.hasOwnProperty('hasNextPage') ? overrides.hasNextPage! : true,
        hasPreviousPage: overrides && overrides.hasOwnProperty('hasPreviousPage') ? overrides.hasPreviousPage! : false,
        startCursor: overrides && overrides.hasOwnProperty('startCursor') ? overrides.startCursor! : 'eum',
    };
};

export const aRemoveCartOfferInput = (overrides?: Partial<RemoveCartOfferInput>): RemoveCartOfferInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '9a4d2ad1-1087-4111-9036-0a16fe84b8a6',
        offerId: overrides && overrides.hasOwnProperty('offerId') ? overrides.offerId! : 'nesciunt',
    };
};

export const aRemoveCartOfferPayload = (overrides?: Partial<RemoveCartOfferPayload>): RemoveCartOfferPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aRemoveCartSelectedItemInput = (overrides?: Partial<RemoveCartSelectedItemInput>): RemoveCartSelectedItemInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'd34eb42f-4dac-4a57-8655-f6e21e922e91',
        itemId: overrides && overrides.hasOwnProperty('itemId') ? overrides.itemId! : '3df818b1-8c01-4e3b-9f18-4dd7b9f15380',
    };
};

export const aRemoveCartSelectedItemPayload = (overrides?: Partial<RemoveCartSelectedItemPayload>): RemoveCartSelectedItemPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aReserveCartBookableItemsInput = (overrides?: Partial<ReserveCartBookableItemsInput>): ReserveCartBookableItemsInput => {
    return {
        bookableTimeId: overrides && overrides.hasOwnProperty('bookableTimeId') ? overrides.bookableTimeId! : 'b487e0e3-3bd3-4086-b742-d4dd05c07e58',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '711f5c8b-80ad-4f8f-9d2e-4e3e7264bcf9',
    };
};

export const aReserveCartBookableItemsPayload = (overrides?: Partial<ReserveCartBookableItemsPayload>): ReserveCartBookableItemsPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aRootMutationType = (overrides?: Partial<RootMutationType>): RootMutationType => {
    return {
        addCartCardPaymentMethod: overrides && overrides.hasOwnProperty('addCartCardPaymentMethod') ? overrides.addCartCardPaymentMethod! : anAddCartCardPaymentMethodPayload(),
        addCartOffer: overrides && overrides.hasOwnProperty('addCartOffer') ? overrides.addCartOffer! : anAddCartOfferPayload(),
        addCartSelectedBookableItem: overrides && overrides.hasOwnProperty('addCartSelectedBookableItem') ? overrides.addCartSelectedBookableItem! : anAddCartSelectedBookableItemPayload(),
        addCartSelectedGiftCardItem: overrides && overrides.hasOwnProperty('addCartSelectedGiftCardItem') ? overrides.addCartSelectedGiftCardItem! : anAddCartSelectedGiftCardItemPayload(),
        addCartSelectedPurchasableItem: overrides && overrides.hasOwnProperty('addCartSelectedPurchasableItem') ? overrides.addCartSelectedPurchasableItem! : anAddCartSelectedPurchasableItemPayload(),
        appointmentAddTags: overrides && overrides.hasOwnProperty('appointmentAddTags') ? overrides.appointmentAddTags! : anAppointmentAddTagsPayload(),
        appointmentReschedule: overrides && overrides.hasOwnProperty('appointmentReschedule') ? overrides.appointmentReschedule! : anAppointmentReschedulePayload(),
        appointmentRescheduleAvailableDates: overrides && overrides.hasOwnProperty('appointmentRescheduleAvailableDates') ? overrides.appointmentRescheduleAvailableDates! : anAppointmentRescheduleAvailableDatesPayload(),
        appointmentRescheduleAvailableTimes: overrides && overrides.hasOwnProperty('appointmentRescheduleAvailableTimes') ? overrides.appointmentRescheduleAvailableTimes! : anAppointmentRescheduleAvailableTimesPayload(),
        authorizeCartOwnership: overrides && overrides.hasOwnProperty('authorizeCartOwnership') ? overrides.authorizeCartOwnership! : anAuthorizeCartOwnershipPayload(),
        cancelAppointment: overrides && overrides.hasOwnProperty('cancelAppointment') ? overrides.cancelAppointment! : aCancelAppointmentPayload(),
        cartAddToWaitlist: overrides && overrides.hasOwnProperty('cartAddToWaitlist') ? overrides.cartAddToWaitlist! : aCartAddToWaitlistPayload(),
        cartBookingQuestionAddAnswer: overrides && overrides.hasOwnProperty('cartBookingQuestionAddAnswer') ? overrides.cartBookingQuestionAddAnswer! : aCartBookingQuestionAddAnswerPayload(),
        cartBookingQuestionClearAnswer: overrides && overrides.hasOwnProperty('cartBookingQuestionClearAnswer') ? overrides.cartBookingQuestionClearAnswer! : aCartBookingQuestionClearAnswerPayload(),
        cartClear: overrides && overrides.hasOwnProperty('cartClear') ? overrides.cartClear! : aCartClearPayload(),
        cartSetLocation: overrides && overrides.hasOwnProperty('cartSetLocation') ? overrides.cartSetLocation! : aCartSetLocationPayload(),
        checkoutCart: overrides && overrides.hasOwnProperty('checkoutCart') ? overrides.checkoutCart! : aCheckoutCartPayload(),
        createCart: overrides && overrides.hasOwnProperty('createCart') ? overrides.createCart! : aCreateCartPayload(),
        createCartGiftCardItemEmailFulfillment: overrides && overrides.hasOwnProperty('createCartGiftCardItemEmailFulfillment') ? overrides.createCartGiftCardItemEmailFulfillment! : aCreateCartGiftCardItemEmailFulfillmentPayload(),
        createCartGuest: overrides && overrides.hasOwnProperty('createCartGuest') ? overrides.createCartGuest! : aCreateCartGuestPayload(),
        deleteCartGiftCardItemEmailFulfillment: overrides && overrides.hasOwnProperty('deleteCartGiftCardItemEmailFulfillment') ? overrides.deleteCartGiftCardItemEmailFulfillment! : aDeleteCartGiftCardItemEmailFulfillmentPayload(),
        deleteCartGuest: overrides && overrides.hasOwnProperty('deleteCartGuest') ? overrides.deleteCartGuest! : aDeleteCartGuestPayload(),
        removeCartOffer: overrides && overrides.hasOwnProperty('removeCartOffer') ? overrides.removeCartOffer! : aRemoveCartOfferPayload(),
        removeCartSelectedItem: overrides && overrides.hasOwnProperty('removeCartSelectedItem') ? overrides.removeCartSelectedItem! : aRemoveCartSelectedItemPayload(),
        reserveCartBookableItems: overrides && overrides.hasOwnProperty('reserveCartBookableItems') ? overrides.reserveCartBookableItems! : aReserveCartBookableItemsPayload(),
        selectCartPaymentMethod: overrides && overrides.hasOwnProperty('selectCartPaymentMethod') ? overrides.selectCartPaymentMethod! : aSelectCartPaymentMethodPayload(),
        sendClientAuthorizationCodeViaEmail: overrides && overrides.hasOwnProperty('sendClientAuthorizationCodeViaEmail') ? overrides.sendClientAuthorizationCodeViaEmail! : aSendClientAuthorizationCodeViaEmailPayload(),
        sendClientAuthorizationCodeViaSms: overrides && overrides.hasOwnProperty('sendClientAuthorizationCodeViaSms') ? overrides.sendClientAuthorizationCodeViaSms! : aSendClientAuthorizationCodeViaSmsPayload(),
        takeCartOwnership: overrides && overrides.hasOwnProperty('takeCartOwnership') ? overrides.takeCartOwnership! : aTakeCartOwnershipPayload(),
        updateCart: overrides && overrides.hasOwnProperty('updateCart') ? overrides.updateCart! : anUpdateCartPayload(),
        updateCartGiftCardItemEmailFulfillment: overrides && overrides.hasOwnProperty('updateCartGiftCardItemEmailFulfillment') ? overrides.updateCartGiftCardItemEmailFulfillment! : anUpdateCartGiftCardItemEmailFulfillmentPayload(),
        updateCartGuest: overrides && overrides.hasOwnProperty('updateCartGuest') ? overrides.updateCartGuest! : anUpdateCartGuestPayload(),
        updateCartSelectedBookableItem: overrides && overrides.hasOwnProperty('updateCartSelectedBookableItem') ? overrides.updateCartSelectedBookableItem! : anUpdateCartSelectedBookableItemPayload(),
        updateCartSelectedGiftCardItem: overrides && overrides.hasOwnProperty('updateCartSelectedGiftCardItem') ? overrides.updateCartSelectedGiftCardItem! : anUpdateCartSelectedGiftCardItemPayload(),
        updateCartSelectedPurchasableItem: overrides && overrides.hasOwnProperty('updateCartSelectedPurchasableItem') ? overrides.updateCartSelectedPurchasableItem! : anUpdateCartSelectedPurchasableItemPayload(),
        updateClient: overrides && overrides.hasOwnProperty('updateClient') ? overrides.updateClient! : anUpdateClientPayload(),
    };
};

export const aRootQueryType = (overrides?: Partial<RootQueryType>): RootQueryType => {
    return {
        appointment: overrides && overrides.hasOwnProperty('appointment') ? overrides.appointment! : anAppointment(),
        business: overrides && overrides.hasOwnProperty('business') ? overrides.business! : aBusiness(),
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
        cartBookableDates: overrides && overrides.hasOwnProperty('cartBookableDates') ? overrides.cartBookableDates! : [aCartBookableDate()],
        cartBookableStaffVariants: overrides && overrides.hasOwnProperty('cartBookableStaffVariants') ? overrides.cartBookableStaffVariants! : [aCartAvailableBookableItemStaffVariant()],
        cartBookableTimes: overrides && overrides.hasOwnProperty('cartBookableTimes') ? overrides.cartBookableTimes! : [aCartBookableTime()],
        client: overrides && overrides.hasOwnProperty('client') ? overrides.client! : aClient(),
        locations: overrides && overrides.hasOwnProperty('locations') ? overrides.locations! : aLocationConnection(),
        myAppointments: overrides && overrides.hasOwnProperty('myAppointments') ? overrides.myAppointments! : anAppointmentConnection(),
        myMemberships: overrides && overrides.hasOwnProperty('myMemberships') ? overrides.myMemberships! : aMembershipConnection(),
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aNode(),
    };
};

export const aSelectCartPaymentMethodInput = (overrides?: Partial<SelectCartPaymentMethodInput>): SelectCartPaymentMethodInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '0fab5fe7-3823-4b10-9609-8d1e7976eaa2',
        paymentMethodId: overrides && overrides.hasOwnProperty('paymentMethodId') ? overrides.paymentMethodId! : '206eb754-4551-4447-8058-06166b2c6ad9',
    };
};

export const aSelectCartPaymentMethodPayload = (overrides?: Partial<SelectCartPaymentMethodPayload>): SelectCartPaymentMethodPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const aSendClientAuthorizationCodeViaEmailInput = (overrides?: Partial<SendClientAuthorizationCodeViaEmailInput>): SendClientAuthorizationCodeViaEmailInput => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'dolorem',
    };
};

export const aSendClientAuthorizationCodeViaEmailPayload = (overrides?: Partial<SendClientAuthorizationCodeViaEmailPayload>): SendClientAuthorizationCodeViaEmailPayload => {
    return {
        clientAuthorizationCodeId: overrides && overrides.hasOwnProperty('clientAuthorizationCodeId') ? overrides.clientAuthorizationCodeId! : 'est',
    };
};

export const aSendClientAuthorizationCodeViaSmsInput = (overrides?: Partial<SendClientAuthorizationCodeViaSmsInput>): SendClientAuthorizationCodeViaSmsInput => {
    return {
        mobilePhone: overrides && overrides.hasOwnProperty('mobilePhone') ? overrides.mobilePhone! : 'magni',
    };
};

export const aSendClientAuthorizationCodeViaSmsPayload = (overrides?: Partial<SendClientAuthorizationCodeViaSmsPayload>): SendClientAuthorizationCodeViaSmsPayload => {
    return {
        clientAuthorizationCodeId: overrides && overrides.hasOwnProperty('clientAuthorizationCodeId') ? overrides.clientAuthorizationCodeId! : 'autem',
    };
};

export const aService = (overrides?: Partial<Service>): Service => {
    return {
        category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : aServiceCategory(),
        categoryId: overrides && overrides.hasOwnProperty('categoryId') ? overrides.categoryId! : '62102480-3a97-4660-8b44-8524cfe48edb',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'eos',
        externalId: overrides && overrides.hasOwnProperty('externalId') ? overrides.externalId! : 'consequuntur',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '4da70d2c-0d44-4b8e-8e3c-80708e0d1d25',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'cupiditate',
    };
};

export const aServiceCategory = (overrides?: Partial<ServiceCategory>): ServiceCategory => {
    return {
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'praesentium',
    };
};

export const aStaff = (overrides?: Partial<Staff>): Staff => {
    return {
        avatar: overrides && overrides.hasOwnProperty('avatar') ? overrides.avatar! : 'aliquid',
        bio: overrides && overrides.hasOwnProperty('bio') ? overrides.bio! : 'consectetur',
        displayName: overrides && overrides.hasOwnProperty('displayName') ? overrides.displayName! : 'voluptatibus',
        firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'quas',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '24717f91-afa7-4612-84c0-a376de64660f',
        insertedAt: overrides && overrides.hasOwnProperty('insertedAt') ? overrides.insertedAt! : 'et',
        lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'ea',
        nickname: overrides && overrides.hasOwnProperty('nickname') ? overrides.nickname! : 'sunt',
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : aStaffRole(),
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'excepturi',
    };
};

export const aStaffRole = (overrides?: Partial<StaffRole>): StaffRole => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'c88906d2-2ada-4a17-a562-e32531579e4f',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'nemo',
    };
};

export const aTakeCartOwnershipInput = (overrides?: Partial<TakeCartOwnershipInput>): TakeCartOwnershipInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '19bbe242-ec7a-469b-bc42-ce0a8e6f7030',
    };
};

export const aTakeCartOwnershipPayload = (overrides?: Partial<TakeCartOwnershipPayload>): TakeCartOwnershipPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const anUpdateCartGiftCardItemEmailFulfillmentInput = (overrides?: Partial<UpdateCartGiftCardItemEmailFulfillmentInput>): UpdateCartGiftCardItemEmailFulfillmentInput => {
    return {
        deliveryDate: overrides && overrides.hasOwnProperty('deliveryDate') ? overrides.deliveryDate! : '2009-04-15',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'b3e62c7c-9973-4340-bb9c-72e10ae0591e',
        itemId: overrides && overrides.hasOwnProperty('itemId') ? overrides.itemId! : 'f524d9d4-f5ea-4b0f-bf95-8d6320dd2946',
        messageFromSender: overrides && overrides.hasOwnProperty('messageFromSender') ? overrides.messageFromSender! : 'et',
        recipientEmail: overrides && overrides.hasOwnProperty('recipientEmail') ? overrides.recipientEmail! : 'facere',
        recipientName: overrides && overrides.hasOwnProperty('recipientName') ? overrides.recipientName! : 'id',
        senderName: overrides && overrides.hasOwnProperty('senderName') ? overrides.senderName! : 'ipsa',
    };
};

export const anUpdateCartGiftCardItemEmailFulfillmentPayload = (overrides?: Partial<UpdateCartGiftCardItemEmailFulfillmentPayload>): UpdateCartGiftCardItemEmailFulfillmentPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
        emailFulfillment: overrides && overrides.hasOwnProperty('emailFulfillment') ? overrides.emailFulfillment! : aCartItemEmailFulfillment(),
    };
};

export const anUpdateCartGuestInput = (overrides?: Partial<UpdateCartGuestInput>): UpdateCartGuestInput => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'explicabo',
        firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'quasi',
        guestId: overrides && overrides.hasOwnProperty('guestId') ? overrides.guestId! : 'cb5eebcf-a30a-4d09-abec-f439fea943d8',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'eb0d6378-f765-4197-997a-20cad038dcfd',
        lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'beatae',
        phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'voluptas',
    };
};

export const anUpdateCartGuestPayload = (overrides?: Partial<UpdateCartGuestPayload>): UpdateCartGuestPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
        guest: overrides && overrides.hasOwnProperty('guest') ? overrides.guest! : aCartGuest(),
    };
};

export const anUpdateCartInput = (overrides?: Partial<UpdateCartInput>): UpdateCartInput => {
    return {
        advanceGratuity: overrides && overrides.hasOwnProperty('advanceGratuity') ? overrides.advanceGratuity! : aCartAdvanceGratuityInput(),
        clientInformation: overrides && overrides.hasOwnProperty('clientInformation') ? overrides.clientInformation! : aCartClientInformationInput(),
        clientMessage: overrides && overrides.hasOwnProperty('clientMessage') ? overrides.clientMessage! : 'non',
        discountCode: overrides && overrides.hasOwnProperty('discountCode') ? overrides.discountCode! : 'labore',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '46f98543-1d9a-4871-98a0-aa97b3366e4f',
        referralSource: overrides && overrides.hasOwnProperty('referralSource') ? overrides.referralSource! : 'velit',
    };
};

export const anUpdateCartPayload = (overrides?: Partial<UpdateCartPayload>): UpdateCartPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const anUpdateCartSelectedBookableItemInput = (overrides?: Partial<UpdateCartSelectedBookableItemInput>): UpdateCartSelectedBookableItemInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '0af2c74a-f9ae-482c-9cc3-776a2824ec0d',
        itemDiscountCode: overrides && overrides.hasOwnProperty('itemDiscountCode') ? overrides.itemDiscountCode! : 'neque',
        itemGuestId: overrides && overrides.hasOwnProperty('itemGuestId') ? overrides.itemGuestId! : '7c2f6e06-6e70-41d1-b2ba-7295fd287a08',
        itemId: overrides && overrides.hasOwnProperty('itemId') ? overrides.itemId! : '07e9a6ee-27e1-499e-a6a9-d4def7aa8c79',
        itemOptionIds: overrides && overrides.hasOwnProperty('itemOptionIds') ? overrides.itemOptionIds! : ['19d9ea5a-93e1-421a-9e00-69133d86bd8c'],
        itemStaffVariantId: overrides && overrides.hasOwnProperty('itemStaffVariantId') ? overrides.itemStaffVariantId! : '5d97de0a-124e-49f3-937e-6f7d7b8a213b',
    };
};

export const anUpdateCartSelectedBookableItemPayload = (overrides?: Partial<UpdateCartSelectedBookableItemPayload>): UpdateCartSelectedBookableItemPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const anUpdateCartSelectedGiftCardItemInput = (overrides?: Partial<UpdateCartSelectedGiftCardItemInput>): UpdateCartSelectedGiftCardItemInput => {
    return {
        giftCardDesignId: overrides && overrides.hasOwnProperty('giftCardDesignId') ? overrides.giftCardDesignId! : 'f95ed4b8-b4b6-49c1-930d-d3653ec41ef0',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '39b8c15a-be2a-4fde-95e4-584419b113d3',
        itemId: overrides && overrides.hasOwnProperty('itemId') ? overrides.itemId! : 'b9cf453c-bdad-4e7d-8b28-47c9f349c120',
        itemPrice: overrides && overrides.hasOwnProperty('itemPrice') ? overrides.itemPrice! : 'molestias',
    };
};

export const anUpdateCartSelectedGiftCardItemPayload = (overrides?: Partial<UpdateCartSelectedGiftCardItemPayload>): UpdateCartSelectedGiftCardItemPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const anUpdateCartSelectedPurchasableItemInput = (overrides?: Partial<UpdateCartSelectedPurchasableItemInput>): UpdateCartSelectedPurchasableItemInput => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'a1d8f63f-165e-483c-af52-9dae3d287c84',
        itemDiscountCode: overrides && overrides.hasOwnProperty('itemDiscountCode') ? overrides.itemDiscountCode! : 'dolorem',
        itemId: overrides && overrides.hasOwnProperty('itemId') ? overrides.itemId! : 'cf175864-dc59-4373-9d96-55c99bbeacfb',
    };
};

export const anUpdateCartSelectedPurchasableItemPayload = (overrides?: Partial<UpdateCartSelectedPurchasableItemPayload>): UpdateCartSelectedPurchasableItemPayload => {
    return {
        cart: overrides && overrides.hasOwnProperty('cart') ? overrides.cart! : aCart(),
    };
};

export const anUpdateClientInput = (overrides?: Partial<UpdateClientInput>): UpdateClientInput => {
    return {
        dob: overrides && overrides.hasOwnProperty('dob') ? overrides.dob! : '1981-06-14',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'adipisci',
        firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'in',
        lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'nulla',
        mobilePhone: overrides && overrides.hasOwnProperty('mobilePhone') ? overrides.mobilePhone! : 'eligendi',
    };
};

export const anUpdateClientPayload = (overrides?: Partial<UpdateClientPayload>): UpdateClientPayload => {
    return {
        client: overrides && overrides.hasOwnProperty('client') ? overrides.client! : aClient(),
    };
};
