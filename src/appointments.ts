import Client from "./client";
import { Appointment, Scalars } from "./graph";

export default class Appointments {
  constructor(private client: Client) {}

  /**
   * @async
   * @param {id} ID the ID of the appointment
   * @protected
   * @returns {Promise} Promise containing the Appointment
   * @todo Implement
   */
  private async get(id: Scalars["ID"]): Promise<Appointment> {
    return undefined;
  }

  /**
   * @async
   * @description List appointments for the authenticated client
   * @protected
   * @returns {Promise} Promise containing the list of Appointments
   * @todo Implement (pagination?)
   */
  private async all(): Promise<Array<Appointment>> {
    return undefined;
  }
}
