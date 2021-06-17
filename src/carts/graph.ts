import { gql } from "graphql-request";
import { fragments as staffFragments } from "../staff/graph";

const fragments = gql`
  ${staffFragments}
  fragment CartProperties on Cart {
    advanceGratuity
    clientInformation
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
    summary
    updatedAt
  }

  fragment CartAvailableCategoryProperties on CartAvailableCategory {
    name
    disabledDescription
    disabled
    description
  }

  fragment CartBookableStaffVariantProperties on CartBookableStaffVariant {
    id
    duration
    price
    staff {
      ...StaffProperties
    }
  }

  fragment CartItemEmailFulfillmentProperties on CartItemEmailFulfillment {
    deliveryDate
    id
    messageFromSender
    recipientEmail
    recipientName
    senderName
  }

  fragment CartGuestProperties on CartGuest {
    email
    firstName
    id
    label
    lastName
    number
    phoneNumber
  }
`;

export const addBookableItemMutation = gql`
  ${fragments}
  mutation AddCartBookableItem($nput: AddCartSelectedBookableItemInput!) {
    addCartSelectedBookableItem(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const addGiftCardItemMutation = gql`
  ${fragments}
  mutation AddCartGiftCardItem($input: AddCartSelectedGiftCardItemInput!) {
    addCartSelectedGiftCardItem(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const addPurchasableItemMutation = gql`
  ${fragments}
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
  ${fragments}
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
  ${fragments}
  mutation CheckoutCart($input: CheckoutCartInput!) {
    checkoutCart(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const createCartMutation = gql`
  ${fragments}
  mutation CreateCart($input: CreateCartInput!) {
    createCart(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const createCartGiftCardItemEmailFulfillmentMutation = gql`
  ${fragments}
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
  ${fragments}
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
  ${fragments}
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
  ${fragments}
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

export const reserveCartMutation = gql`
  ${fragments}
  mutation ReserveCartBookableItems($input: ReserveCartBookableItemsInput!) {
    reserveCartBookableItems(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const updateCartMutation = gql`
  ${fragments}
  mutation UpdateCart($input: UpdateCartInput!) {
    updateCart(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;

export const addCardPaymentMethodMutation = gql`
  ${fragments}
  mutation AddCartCardPaymentMethod($input: AddCartCardPaymentMethodInput!) {
    addCartCardPaymentMethod(input: $input) {
      cart {
        ...CartProperties
      }
    }
  }
`;
