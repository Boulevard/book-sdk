import { Client } from "./client";
import { Appointment as GraphAppointment, Scalars } from "./graph";

class Appointment {
  /**
   * @internal
   */
  constructor(private client: Client, private appointment: GraphAppointment) {}

  /**
   * @async
   * @description Reschedule the provided appointment to a new date and time.
   * @param bookableTimeId The encoded data representing an available appointment slot (can be computed using rescheduleAvailableTimes())
   * @param sendNotification Creates a notification for the dashboard users to let them know that the appointment has been self-rescheduled by the client.
   * @protected
   * @returns {Promise} Promise containing the updated Appointment
   * @todo Implement
   */
  async reschedule(
    bookableTimeId: Scalars["ID"],
    sendNotification: boolean
  ): Promise<Appointment> {
    return undefined;
  }

  /**
   * @async
   * @description Get the available dates for the provided appointment.
   * @param searchRangeLower The lower range (inclusive) of dates to search for appointment availability.
   * @param searchRangeUpper The upper range (inclusive) of dates to search for appointment availability.
   * @protected
   * @returns {Promise} Promise containing the updated Appointment
   * @todo Implement
   */
  async rescheduleAvaialableDates(
    searchRangeLower: Scalars["Date"],
    searchRangeUpper: Scalars["Date"]
  ): Promise<Appointment> {
    return undefined;
  }

  /**
   * @async
   * @description Get the available appointment times on a particular date for the provided appointment.
   * @param date The date that should be searched for available times.
   * @protected
   * @returns {Promise} Promise containing the updated Appointment
   * @todo Implement
   */
  async rescheduleAvaialableTimes(date: Scalars["Date"]): Promise<Appointment> {
    return undefined;
  }

  /**
   * @async
   * @description Cancel an Appointment.
   * @protected
   * @returns {Promise} Promise containing the updated Appointment
   * @todo Implement
   */
  async cancel(notes?: string): Promise<Appointment> {
    return undefined;
  }
}

class Appointments {
  /**
   * @internal
   */
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
export { Appointments };
