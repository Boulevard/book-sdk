import { Maybe, Scalars, Staff as GraphStaff } from "./graph";
import { PlatformClient } from "./platformClient";

class Staff {
  /** A biography of the staff member */
  bio?: Maybe<Scalars["String"]>;
  /** The first name of the staff member. */
  firstName: Scalars["String"];
  /** The ID of an object */
  id: Scalars["ID"];
  insertedAt: Scalars["DateTime"];
  /** The last name of the staff member. */
  lastName: Scalars["String"];
  /** The nickname of the staff member */
  nickname?: Maybe<Scalars["String"]>;
  /** The role the staff member holds at the business */
  role: StaffRole;
  updatedAt: Scalars["DateTime"];

  /**
   * @internal
   */
  constructor(private platformClient: PlatformClient, staff: GraphStaff) {
    Object.assign(this, staff);
  }
}

type StaffRole = {
  /** The ID of an object */
  id: Scalars["ID"];
  /** Name of the role */
  name: Scalars["String"];
};

export { Staff, StaffRole };
