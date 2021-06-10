import { PlatformClient } from "./platformClient";
import {
  Appointment as GraphAppointment,
  AppointmentCancellation,
  AppointmentService,
  AvailableRescheduleDate,
  AvailableRescheduleTime,
  CartBookableTime,
  Scalars,
  Client,
  Location,
  AppointmentState
} from "./graph";

class Appointment implements Omit<GraphAppointment, "clientId" | "locationId"> {
  appointmentServices: Array<AppointmentService>;
  cancellation?: AppointmentCancellation;
  cancelled: Scalars["Boolean"];
  client: Client;
  createdAt: Scalars["DateTime"];
  duration: Scalars["Int"];
  endAt: Scalars["DateTime"];
  id: Scalars["ID"];
  location: Location;
  notes?: Scalars["String"];
  startAt: Scalars["DateTime"];
  state: AppointmentState;

  /**
   * @internal
   */
  constructor(
    private platformClient: PlatformClient,
    appointment: GraphAppointment
  ) {
    Object.assign(this, appointment);
  }

  /**
   * @async
   * @description Reschedule the provided appointment to a new date and time.
   * @param bookableTime The encoded data representing an available appointment slot (can be computed using rescheduleAvailableTimes())
   * @param sendNotification Creates a notification for the dashboard users to let them know that the appointment has been self-rescheduled by the client.
   * @protected
   * @returns {Promise} Promise containing the updated Appointment
   * @todo Implement
   */
  async reschedule(
    bookableTime: CartBookableTime,
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
   * @returns {Promise} Promise containing a list of AvailableRescheduleDate
   * @todo Implement
   */
  async rescheduleAvaialableDates(
    searchRangeLower: Scalars["Date"],
    searchRangeUpper: Scalars["Date"]
  ): Promise<Array<AvailableRescheduleDate>> {
    return undefined;
  }

  /**
   * @async
   * @description Get the available appointment times on a particular date for the provided appointment.
   * @param date The date that should be searched for available times.
   * @protected
   * @returns {Promise} Promise containing a list of AvailableRescheduleTime
   * @todo Implement
   * @todo Timezone support
   */
  async rescheduleAvaialableTimes(
    date: Scalars["Date"]
  ): Promise<Array<AvailableRescheduleTime>> {
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
  constructor(private platformClient: PlatformClient) {}

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
export { Appointment, Appointments };
