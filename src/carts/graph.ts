import { gql } from "graphql-request";

export const addBookableItemMutation = gql`
  mutation AddCartBookableItem($id: ID!, $itemId: ID!) {
    addCartSelectedBookableItem(input: { id: $id, itemId: $itemId }) {
      cart {
        id
        selectedItems {
          id
          price
          lineTotal
          item {
            id
            name
          }
        }
      }
    }
  }
`;

export const addGiftCardItemMutation = gql`
  mutation AddCartGiftCardItem($id: ID!, $itemId: ID!) {
    addCartSelectedGiftCardItem(input: { id: $id, itemId: $itemId }) {
      cart {
        id
        selectedItems {
          id
          price
          lineTotal
          item {
            id
            name
          }
        }
      }
    }
  }
`;

export const addPurchasableItemMutation = gql`
  mutation AddCartPurchasableItem($id: ID!, $itemId: ID!) {
    addCartSelectedPurchasableItem(input: { id: $id, itemId: $itemId }) {
      cart {
        id
        selectedItems {
          id
          price
          lineTotal
          item {
            id
            name
          }
        }
      }
    }
  }
`;

export const getDatesQuery = gql`
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

export const getTimesQuery = gql`
  query CartBookableTimes($id: ID!, $searchDate: Date!, $tz: Tz) {
    cartBookableTimes(id: $id, searchDate: $searchDate, tz: $tz) {
      id
      score
      startTime
    }
  }
`;

export const createCartMutation = gql`
  mutation CreateCart($locationId: ID!) {
    createCart(input: { locationId: $locationId }) {
      cart {
        id
        availableCategories {
          name
          availableItems {
            id
            name
          }
        }
      }
    }
  }
`;

export const reserveCartMutation = gql`
  mutation ReserveCartBookableItems($id: ID!, $bookableTimeId: ID!) {
    reserveCartBookableItems(
      input: { id: $id, bookableTimeId: $bookableTimeId }
    ) {
      cart {
        id
      }
    }
  }
`;

export const updateCartMutation = gql`
  mutation UpdateCart(
    $id: ID!
    $clientInformation: CartClientInformationInput
  ) {
    updateCart(input: { id: $id, clientInformation: $clientInformation }) {
      cart {
        id
      }
    }
  }
`;

export const addCardPaymentMethodMutation = gql`
  mutation AddCartCardPaymentMethod($id: ID!, $token: ID!, $select: Boolean) {
    addCartCardPaymentMethod(
      input: { id: $id, token: $token, select: $select }
    ) {
      cart {
        id
      }
    }
  }
`;
