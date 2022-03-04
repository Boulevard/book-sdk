import { Cart } from "./cart";
import { aCart } from "./graph";
import { createMockPlatformClient } from "../tests/helpers";
import {
  aSendCartOwnershipCodeByEmailMutation,
  aSendCartOwnershipCodeBySmsMutation,
  aTakeCartOwnershipByCodeMutation
} from "../tests/factories";

test("sendCartOwnershipCodeBySms", async () => {
  const platformClient = createMockPlatformClient();
  const gqlCart = aCart();
  const codeId = "2dd9eaad-7092-4b63-88ae-d1d0053d29db";
  const mobilePhone = "+16789 9384323";

  platformClient.sdk().sendCartOwnershipCodeBySms = jest.fn(({ input }) =>
    Promise.resolve(aSendCartOwnershipCodeBySmsMutation(codeId))
  );

  const cart = new Cart(platformClient, gqlCart);
  const receivedCodeId: string = await cart.sendOwnershipCodeBySms(mobilePhone);

  expect(receivedCodeId).toEqual(codeId);

  expect(platformClient.sdk().sendCartOwnershipCodeBySms).toHaveBeenCalledWith({
    input: { mobilePhone }
  });
});

test("sendCartOwnershipCodeByEmail", async () => {
  const client = createMockPlatformClient();
  const gqlCart = aCart();
  const codeId = "2dd9eaad-7092-4b63-88ae-d1d0053d29db";
  const email = "jim@bob.com";

  client.sdk().sendCartOwnershipCodeByEmail = jest.fn(({ input }) =>
    Promise.resolve(aSendCartOwnershipCodeByEmailMutation(codeId))
  );

  const cart = new Cart(client, gqlCart);
  const receivedCodeId: string = await cart.sendOwnershipCodeByEmail(email);

  expect(receivedCodeId).toEqual(codeId);

  expect(client.sdk().sendCartOwnershipCodeByEmail).toHaveBeenCalledWith({
    input: { email }
  });
});

test("takeCartOwnershipByCode", async () => {
  const platformClient = createMockPlatformClient();
  const gqlCart = aCart();
  const codeId = "2dd9eaad-7092-4b63-88ae-d1d0053d29db";
  const codeValue = 12345;

  platformClient.request = jest.fn(_ => {
    return Promise.resolve({ cart: gqlCart });
  });

  platformClient.sdk().takeCartOwnershipByCode = jest.fn(({ input }) =>
    Promise.resolve(aTakeCartOwnershipByCodeMutation(gqlCart.id))
  );

  const cart = new Cart(platformClient, gqlCart);
  const updatedCart = await cart.takeOwnershipByCode(codeId, codeValue);

  expect(updatedCart.clientInformation);

  expect(platformClient.sdk().takeCartOwnershipByCode).toHaveBeenCalledWith({
    input: {
      cartId: cart.id,
      cartOwnershipCodeId: codeId,
      cartOwnershipCodeValue: codeValue
    }
  });
});
