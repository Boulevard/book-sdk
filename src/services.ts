import { Node, PlatformClient } from "./platformClient";
import { Maybe, Scalars } from "./graph";
import * as Graph from "./graph";

class ServiceCategory extends Node<Graph.ServiceCategory> {
  /** Name */
  name: Scalars["String"];
}

class Service extends Node<Graph.Service> {
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
  constructor(platformClient: PlatformClient, service: Graph.Service) {
    super(platformClient, service);
    this.category = new ServiceCategory(platformClient, service.category);
  }
}

export { Service, ServiceCategory };
