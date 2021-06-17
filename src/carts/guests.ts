import { Scalars, Maybe } from "../graph";
import * as Graph from "../graph";
import { Node } from "../platformClient";

/** A guest that can be associated with a bookable item. */
class CartGuest extends Node<Graph.CartGuest> {
  /** Email address, if provided. */
  email: Maybe<Scalars["Email"]>;

  /** First name, if provided. */
  firstName: Maybe<Scalars["String"]>;

  /** ID of the guest. */
  id: Scalars["ID"];

  /**
   * Name of the guest if provided, otherwise a user-friendly fallback name that
   * uniquely identifies the guest.
   */
  label: Scalars["String"];

  /** Last name, if provided. */
  lastName: Maybe<Scalars["String"]>;

  /**
   * Positive ordinal number starting at 1.
   *
   * This is for display purposes, don't use this to uniquely identify guests.
   * Use the `id` field for that instead. Also, don't assume this scheme follows
   * any predefined ordering.
   */
  number: Scalars["Int"];

  /** Mobile phone, if provided. */
  phoneNumber: Maybe<Scalars["PhoneNumber"]>;
}

export { CartGuest };
