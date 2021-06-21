import { gql } from "graphql-request";
import { fragments as staffFragments } from "../staff/graph";
import { fragments as locationFragments } from "../locations/graph";

const availabilityFragment = gql`
  fragment CartAvailableItemProperties on CartAvailableItem {
    __typename
    description
    disabled
    disabledDescription
    id
    listPrice
    listPriceRange {
      max
      min
      variable
    }
    name
  }

  fragment CartAvailableCategoryProperties on CartAvailableCategory {
    name
    disabledDescription
    disabled
    description
    availableItems {
      ...CartAvailableItemProperties
    }
  }
`;

const fragments = {
  cart: gql`
    ${staffFragments}
    fragment CartProperties on Cart {
      advanceGratuity {
        fixed
        percentage
      }
      clientInformation {
        email
        firstName
        lastName
        phoneNumber
      }
      clientMessage
      completedAt
      endTime
      errors {
        code
        description
        message
      }
      expiresAt
      id
      insertedAt
      startTime
      summary {
        deposit
        depositAmount
        discountAmount
        gratuityAmount
        paymentMethodRequired
        roundingAmount
        subtotal
        taxAmount
        total
      }
      updatedAt
    }
  `,
  availability: availabilityFragment,
  features: gql`
    fragment CartFeaturesProperties on CartFeatures {
      giftCardPurchaseEnabled
      paymentInfoRequired
    }
  `,
  item: gql`
    ${availabilityFragment}
    fragment CartItemProperties on CartItem {
      __typename
      discountAmount
      discountCode
      errors {
        code
        description
        message
      }
      id
      item {
        ...CartAvailableItemProperties
      }
      lineTotal
      price
      taxAmount
    }
  `,
  offer: gql`
    fragment CartOfferProperties on CartOffer {
      id
      name
      code
      applied
    }
  `,
  staffVariant: gql`
    fragment CartBookableStaffVariantProperties on CartBookableStaffVariant {
      id
      duration
      price
      staff {
        ...StaffProperties
      }
    }
  `,
  emailFulfilment: gql`
    fragment CartItemEmailFulfillmentProperties on CartItemEmailFulfillment {
      deliveryDate
      id
      messageFromSender
      recipientEmail
      recipientName
      senderName
    }
  `,
  guest: gql`
    fragment CartGuestProperties on CartGuest {
      email
      firstName
      id
      label
      lastName
      number
      phoneNumber
    }
  `
};

export const addBookableItemMutation = gql`
  ${fragments.cart}
  mutation AddCartBookableItem($input: AddCartSelectedBookableItemInput!) {
    addCartSelectedBookableItem(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const addGiftCardItemMutation = gql`
  ${fragments.cart}
  mutation AddCartGiftCardItem($input: AddCartSelectedGiftCardItemInput!) {
    addCartSelectedGiftCardItem(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const addPurchasableItemMutation = gql`
  ${fragments.cart}
  mutation AddCartPurchasableItem(
    $input: AddCartSelectedPurchasableItemInput!
  ) {
    addCartSelectedPurchasableItem(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const availableCategoriesQuery = gql`
  ${fragments.availability}
  query Cart($id: ID!) {
    cart(id: $id) {
      availableCategories {
        ...CartAvailableCategoryProperties
      }
    }
  }
`;

export const availablePaymentMethodsQuery = gql`
  ${fragments}
  query Cart($id: ID!) {
    cart(id: $id) {
      availablePaymentMethods {
        ...CartAvailablePaymentMethodProperties
      }
    }
  }
`;

export const bookableStaffVariantsQuery = gql`
  ${fragments}
  query CartBookableStaffVariants($id: ID!, $itemId: ID!, bookableTimeId: ID!) {
    cartBookableStaffVariants(id: $id, itemId: $itemId, bookableTimeId: $bookableTimeId) {
      ...CartBookableStaffVariantProperties
    }
  }
`;

export const cartQuery = gql`
  ${fragments.cart}
  query Cart($id: ID!) {
    cart(id: $id) {
      ...CartProperties
    }
  }
`;

export const datesQuery = gql`
  query CartBookableDates(
    $id: ID!
    $searchRangeLower: Date
    $searchRangeUpper: Date
    $tz: Tz
  ) {
    cartBookableDates(
      id: $id
      searchRangeLower: $searchRangeLower
      searchRangeUpper: $searchRangeUpper
      tz: $tz
    ) {
      date
    }
  }
`;

export const timesQuery = gql`
  query CartBookableTimes($id: ID!, $searchDate: Date!, $tz: Tz) {
    cartBookableTimes(id: $id, searchDate: $searchDate, tz: $tz) {
      id
      score
      startTime
    }
  }
`;

export const checkoutCartMutation = gql`
  ${fragments.cart}
  mutation CheckoutCart($input: CheckoutCartInput!) {
    checkoutCart(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const createCartMutation = gql`
  ${fragments.cart}
  mutation CreateCart($input: CreateCartInput!) {
    createCart(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const createCartGiftCardItemEmailFulfillmentMutation = gql`
  ${fragments.cart}
  ${fragments.emailFulfilment}
  mutation CreateCartGiftCardItemEmailFulfillment(
    $input: CreateCartGiftCardItemEmailFulfillmentInput!
  ) {
    createCartGiftCardItemEmailFulfillment(input: $input) {
      cart {
        ...CartProperties
      }
      emailFulfillment {
        ...CartItemEmailFulfillmentProperties
      }
    }
  }
`;

export const createGuestMutation = gql`
  ${fragments.cart}
  ${fragments.guest}
  mutation CreateGuest($input: CreateCartGuestInput!) {
    createGuest(input: $input) {
      cart {
        ...CartProperties
      }
      guest {
        ...CartGuestProperties
      }
    }
  }
`;

export const deleteCartGiftCardItemEmailFulfillmentMutation = gql`
  ${fragments.cart}
  ${fragments.emailFulfilment}
  mutation DeleteCartGiftCardItemEmailFulfillment(
    $input: DeleteCartGiftCardItemEmailFulfillmentInput!
  ) {
    deleteCartGiftCardItemEmailFulfillment(input: $input) {
      cart {
        ...CartProperties
      }
      emailFulfillment {
        ...CartItemEmailFulfillmentProperties
      }
    }
  }
`;

export const deleteGuestMutation = gql`
  ${fragments.cart}
  ${fragments.guest}
  mutation DeleteGuest($input: DeleteCartGuestInput!) {
    deleteGuest(input: $input) {
      cart {
        ...CartProperties
      }
      guest {
        ...CartGuestProperties
      }
    }
  }
`;

export const featuresQuery = gql`
  ${fragments.features}
  query Cart($id: ID!) {
    cart(id: $id) {
      features {
        ...CartFeaturesProperties
      }
    }
  }
`;

export const guestsQuery = gql`
  ${fragments.guest}
  query Cart($id: ID!) {
    cart(id: $id) {
      guests {
        ...CartGuestProperties
      }
    }
  }
`;

export const locationQuery = gql`
  ${locationFragments}
  query Cart($id: ID!) {
    cart(id: $id) {
      location {
        ...LocationProperties
      }
    }
  }
`;

export const offersQuery = gql`
  ${fragments.offer}
  query Cart($id: ID!) {
    cart(id: $id) {
      offers {
        ...CartOfferProperties
      }
    }
  }
`;

export const removeOfferMutation = gql`
  ${fragments.cart}
  mutation RemoveCartOffer($input: RemoveCartOfferInput!) {
    removeCartOffer(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const removeSelectedItemMutation = gql`
  ${fragments.cart}
  mutation RemoveCartSelectedItem($input: RemoveCartSelectedItemInput!) {
    removeCartSelectedItem(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const reserveCartMutation = gql`
  ${fragments.cart}
  mutation ReserveCartBookableItems($input: ReserveCartBookableItemsInput!) {
    reserveCartBookableItems(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const selectedItemsQuery = gql`
  ${fragments.offer}
  ${fragments.item}
  query Cart($id: ID!) {
    cart(id: $id) {
      selectedItems {
        ...CartItemProperties
      }
    }
  }
`;

export const selectPaymentMethodMutation = gql`
  ${fragments.cart}
  mutation SelectCartPaymentMethod($input: SelectCartPaymentMethodInput!) {
    selectCartPaymentMethod(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const takeOwnershipMutation = gql`
  ${fragments.cart}
  mutation TakeOwnership($input: TakeCartOwnershipInput!) {
    takeCartOwnership(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const updateCartMutation = gql`
  ${fragments.cart}
  mutation UpdateCart($input: UpdateCartInput!) {
    updateCart(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const updateCartGiftCardItemEmailFulfillmentMutation = gql`
  ${fragments.cart}
  ${fragments.emailFulfilment}
  mutation UpdateCartGiftCardItemEmailFulfillment(
    $input: UpdateCartGiftCardItemEmailFulfillmentInput!
  ) {
    updateCartGiftCardItemEmailFulfillment(input: $input) {
      cart {
        ...CartProperties
      }
      emailFulfillment {
        ...CartItemEmailFulfillmentProperties
      }
    }
  }
`;

export const updateGuestMutation = gql`
  ${fragments.cart}
  ${fragments.guest}
  mutation UpdateGuest($input: UpdateCartGuestInput!) {
    updateGuest(input: $input) {
      cart {
        ...CartProperties
      }
      guest {
        ...CartGuestProperties
      }
    }
  }
`;

export const updateSelectedBookableItemMutation = gql`
  ${fragments.cart}
  mutation UpdateCartBookableItem(
    $input: UpdateCartSelectedBookableItemInput!
  ) {
    updateCartSelectedBookableItem(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const updateSelectedGiftCardItemMutation = gql`
  ${fragments.cart}
  mutation UpdateCartGiftCardItem(
    $input: UpdateCartSelectedGiftCardItemInput!
  ) {
    updateCartSelectedGiftCardItem(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const updateSelectedPurchasableItemMutation = gql`
  ${fragments.cart}
  mutation UpdateCartPurchasableItem(
    $input: UpdateCartSelectedPurchasableItemInput!
  ) {
    updateCartSelectedPurchasableItem(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const addCardPaymentMethodMutation = gql`
  ${fragments.cart}
  mutation AddCartCardPaymentMethod($input: AddCartCardPaymentMethodInput!) {
    addCartCardPaymentMethod(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;
