import {
  AuthorizeCartOwnershipMutation,
  SendClientAuthorizationCodeViaEmailMutation,
  SendClientAuthorizationCodeViaSmsMutation
} from "../src/graph";

export const aSendClientAuthorizationCodeViaEmailMutation = (
  codeId: string
): SendClientAuthorizationCodeViaEmailMutation => ({
  __typename: "RootMutationType",
  sendClientAuthorizationCodeViaEmail: {
    __typename: "SendClientAuthorizationCodeViaEmailPayload",
    clientAuthorizationCodeId: codeId
  }
});

export const aSendClientAuthorizationCodeViaSmsMutation = (
  codeId: string
): SendClientAuthorizationCodeViaSmsMutation => ({
  __typename: "RootMutationType",
  sendClientAuthorizationCodeViaSms: {
    __typename: "SendClientAuthorizationCodeViaSmsPayload",
    clientAuthorizationCodeId: codeId
  }
});

export const aAuthorizeCartOwnershipMutation = (
  wasAuthorized: boolean
): AuthorizeCartOwnershipMutation => ({
  __typename: "RootMutationType",
  authorizeCartOwnership: {
    __typename: "AuthorizeCartOwnershipPayload",
    wasAuthorized
  }
});
