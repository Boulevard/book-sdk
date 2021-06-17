import { Maybe, Scalars, Service as GraphService } from "./graph";
import { PlatformClient } from "./platformClient";

type ServiceCategory = {
  /** Name */
  name: Scalars["String"];
};

class Service {
  /** Service Category */
  category: ServiceCategory;

  /** Description */
  description: Maybe<Scalars["String"]>;

  /** External Id */
  externalId: Maybe<Scalars["String"]>;

  /** The ID of an object */
  id: Scalars["ID"];

  /** Name */
  name: Scalars["String"];

  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient, service: GraphService) {
    Object.assign(this, service);
  }
}

export { Service, ServiceCategory };
