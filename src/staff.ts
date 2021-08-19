import { Node } from "./platformClient";
import { Maybe, Scalars } from "./graph";
import * as Graph from "./graph";

class Staff extends Node<Graph.Staff> {
  /** A URL to the Avatar uploaded for this staff within the Boulevard Dashboard */
  avatar: Maybe<Scalars["String"]>;

  /** A biography of the staff member */
  bio: Maybe<Scalars["String"]>;

  /** The first name of the staff member. */
  firstName: Scalars["String"];

  /** The ID of an object */
  id: Scalars["ID"];
  insertedAt: Scalars["DateTime"];

  /** The last name of the staff member. */
  lastName: Scalars["String"];

  /** The nickname of the staff member */
  nickname: Maybe<Scalars["String"]>;

  /** The role the staff member holds at the business */
  role: StaffRole;

  updatedAt: Scalars["DateTime"];

  /**
   * @internal
   */
  constructor(platformClient, staff) {
    super(platformClient, staff);
    this.role = new StaffRole(platformClient, staff.role);
  }
}

class StaffRole extends Node<Graph.StaffRole> {
  /** The ID of an object */
  id: Scalars["ID"];

  /** Name of the role */
  name: Scalars["String"];
}

export { Staff, StaffRole };
