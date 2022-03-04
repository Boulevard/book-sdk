import {
  TakeCartOwnershipByCodeMutation,
  SendCartOwnershipCodeByEmailMutation,
  SendCartOwnershipCodeBySmsMutation,
  Cart
} from "../src/graph";

export const aSendCartOwnershipCodeByEmailMutation = (
  cartOwnershipCodeId: string
): SendCartOwnershipCodeByEmailMutation => ({
  __typename: "RootMutationType",
  sendCartOwnershipCodeByEmail: {
    __typename: "SendCartOwnershipCodeByEmailPayload",
    cartOwnershipCodeId: cartOwnershipCodeId
  }
});

export const aSendCartOwnershipCodeBySmsMutation = (
  cartOwnershipCodeId: string
): SendCartOwnershipCodeBySmsMutation => ({
  __typename: "RootMutationType",
  sendCartOwnershipCodeBySms: {
    __typename: "SendCartOwnershipCodeBySmsPayload",
    cartOwnershipCodeId: cartOwnershipCodeId
  }
});

export const aTakeCartOwnershipByCodeMutation = (
  cartId: string
): TakeCartOwnershipByCodeMutation => ({
  __typename: "RootMutationType",
  takeCartOwnershipByCode: {
    __typename: "TakeCartOwnershipByCodePayload",
    cart: {
      id: cartId
    }
  }
});
