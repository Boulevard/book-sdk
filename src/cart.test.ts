import { Cart } from "./cart";
import { aCart } from "./graph";
import { createMockPlatformClient } from "../tests/helpers";
import {
  aAuthorizeCartOwnershipMutation,
  aSendClientAuthorizationCodeViaEmailMutation,
  aSendClientAuthorizationCodeViaSmsMutation
} from "../tests/factories";

test("sendClientAuthorizationCodeViaSms", async () => {
  const client = createMockPlatformClient();
  const gqlCart = aCart();
  const codeId = "2dd9eaad-7092-4b63-88ae-d1d0053d29db";
  const mobilePhone = "+16789 9384323";

  client.sdk().sendClientAuthorizationCodeViaSms = jest.fn(({ input }) =>
    Promise.resolve(aSendClientAuthorizationCodeViaSmsMutation(codeId))
  );

  const cart = new Cart(client, gqlCart);
  const receivedCodeId: string = await cart.sendClientAuthorizationCodeViaSms(
    mobilePhone
  );

  expect(receivedCodeId).toEqual(codeId);

  expect(client.sdk().sendClientAuthorizationCodeViaSms).toHaveBeenCalledWith({
    input: { mobilePhone }
  });
});

test("sendClientAuthorizationCodeViaEmail", async () => {
  const client = createMockPlatformClient();
  const gqlCart = aCart();
  const codeId = "2dd9eaad-7092-4b63-88ae-d1d0053d29db";
  const email = "jim@bob.com";

  client.sdk().sendClientAuthorizationCodeViaEmail = jest.fn(({ input }) =>
    Promise.resolve(aSendClientAuthorizationCodeViaEmailMutation(codeId))
  );

  const cart = new Cart(client, gqlCart);
  const receivedCodeId: string = await cart.sendClientAuthorizationCodeViaEmail(
    email
  );

  expect(receivedCodeId).toEqual(codeId);

  expect(
    client.sdk().sendClientAuthorizationCodeViaEmail
  ).toHaveBeenCalledWith({ input: { email } });
});

test("authorizeCartOwnership", async () => {
  const client = createMockPlatformClient();
  const gqlCart = aCart();
  const codeId = "2dd9eaad-7092-4b63-88ae-d1d0053d29db";
  const codeValue = 12345;
  const wasAuthorized = true;

  client.sdk().authorizeCartOwnership = jest.fn(({ input }) =>
    Promise.resolve(aAuthorizeCartOwnershipMutation(wasAuthorized))
  );

  const cart = new Cart(client, gqlCart);
  const receivedWasAuthorized: boolean = await cart.authorizeCartOwnership(
    codeId,
    codeValue
  );

  expect(wasAuthorized).toEqual(receivedWasAuthorized);

  expect(client.sdk().authorizeCartOwnership).toHaveBeenCalledWith({
    input: {
      cartId: cart.id,
      clientAuthorizationCodeId: codeId,
      clientAuthorizationCodeValue: codeValue
    }
  });
});
