import {
  aSendClientAuthorizationCodeViaSmsInput,
  aSendClientAuthorizationCodeViaSmsPayload,
  SendClientAuthorizationCodeViaEmailMutation,
  Sdk,
  SendClientAuthorizationCodeViaSmsMutation,
  aCart
} from "../src/graph";
import { createMock } from "ts-auto-mock";
import { PlatformClient } from "../src/platformClient";

interface SdkInterface extends Sdk {}

export const createMockPlatformClient = () => {
  let sdk: Sdk = createMock<SdkInterface>();
  let authenticatedSdk: Sdk = createMock<SdkInterface>();
  let platformClient: PlatformClient = createMock<PlatformClient>();

  platformClient.authenticatedSdk = auth => sdk;
  platformClient.sdk = () => authenticatedSdk;

  return platformClient;
};
