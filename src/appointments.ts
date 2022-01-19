import { Node, PlatformClient } from "./platformClient";
import type { AppointmentCancellationReason, AppointmentState, CalendarLinks } from "./graph";
import type { Scalars, Maybe } from "./graph";
import type * as Graph from "./graph";
import {
  myAppointmentsQuery,
  appointmentQuery,
  appointmentLocationQuery,
  appointmentClientQuery,
  cancelAppointmentMutation,
  availableRescheduleTimesQuery,
  availableRescheduleDatesQuery,
  appointmentRescheduleMutation
} from "./appointments/graph";
import { Service } from "./services";
import { Staff } from "./staff";
import { Location } from "./locations";
import { Client } from "./clients";
import { CartBookableTime } from "./carts";

class AvailableRescheduleTime extends Node<Graph.AvailableRescheduleTime> {
  bookableTimeId: Scalars["ID"];

  /** Matched start time for the booking. */
  startTime: Scalars["DateTime"];
}

class AvailableRescheduleDate extends Node<Graph.AvailableRescheduleDate> {
  /**
   * Matched date for the booking.
   *
   * Note that this date may differ from the one at the location when a specific
   * time zone is requested using the `tz` argument. The date uses the requested
   * time zone, or the location's time zone when `tz` is null.
   */
  date: Scalars["Date"];
}

class AppointmentService extends Node<Graph.AppointmentService> {
  /** Duration for the entire service (including add-ons) */
  duration: Scalars["Int"];

  /** The ISO time at which the appointment service is completely finished. */
  endAt: Scalars["DateTime"];

  /** Price of the service, before any discounts or taxes are applied. */
  price: Scalars["Money"];

  /** The service. */
  service: Service;

  /** The staff performing this service. */
  staff: Staff;

  /** A boolean indicating whether the staff was specifically requested by the client. */
  staffRequested: Scalars["Boolean"];

  /** The ISO time at which the appointment service begins */
  startAt: Scalars["DateTime"];

  /** Length of time (in minutes) from the start of the appointment until this service begins. */
  startTimeOffset: Scalars["Int"];

  /** The total duration (in minutes) of this service */
  totalDuration: Scalars["Int"];

  /**
   * @internal
   */
  constructor(
    platformClient: PlatformClient,
    appointmentService: Graph.AppointmentService
  ) {
    super(platformClient, appointmentService);
    this.staff = new Staff(platformClient, appointmentService.staff);
    this.service = new Service(this.platformClient, appointmentService.service);
  }
}

class AppointmentCancellation extends Node<Graph.AppointmentCancellation> {
  /** Datetime the appointment was cancelled in UTC. */
  cancelledAt: Scalars["DateTime"];
  notes: Maybe<Scalars["String"]>;
  reason: AppointmentCancellationReason;
}

class Appointment extends Node<Graph.Appointment> {
  /** A collection of appointment services. */
  appointmentServices: Array<AppointmentService>;

  /** Information about the cancellation, if present */
  cancellation: Maybe<AppointmentCancellation>;

  /** Boolean signifying if the appointment is cancelled or not */
  cancelled: Scalars["Boolean"];

  /** When the appointment was created (in Etc/UTC) */
  createdAt: Scalars["DateTime"];

  /** The duration of the appointment */
  duration: Scalars["Int"];

  /** End time for the appointment */
  endAt: Scalars["DateTime"];

  /** The ID of an object */
  id: Scalars["ID"];

  /** Internal notes on the appointment */
  notes: Maybe<Scalars["String"]>;

  /** Start time for the appointment */
  startAt: Scalars["DateTime"];

  /** The state of the appointment. */
  state: AppointmentState;

  /** Calendar links for the appointment */
  calendarLinks: CalendarLinks;

  /**
   * @internal
   */
  constructor(platformClient: PlatformClient, appointment: Graph.Appointment) {
    super(platformClient, appointment);
    this.cancellation =
      appointment.cancellation &&
      new AppointmentCancellation(platformClient, appointment.cancellation);
    this.appointmentServices = appointment.appointmentServices.map(
      appointmentService =>
        new AppointmentService(this.platformClient, appointmentService)
    );
  }

  /**
   * Reschedule the provided appointment to a new date and time.
   *
   * @async
   * @param bookableTime The encoded data representing an available appointment slot (can be computed using rescheduleAvailableTimes())
   * @param sendNotification Creates a notification for the dashboard users to let them know that the appointment has been self-rescheduled by the client.
   * @protected
   * @returns Promise containing the updated Appointment
   */
  async reschedule(
    bookableTime: CartBookableTime,
    sendNotification: boolean
  ): Promise<Appointment> {
    const input: Graph.AppointmentRescheduleInput = {
      appointmentId: this.id,
      bookableTimeId: bookableTime.id,
      sendNotification
    };

    const response = await this.platformClient.request(
      appointmentRescheduleMutation,
      { input }
    );

    return new Appointment(
      this.platformClient,
      response.appointmentReschedule.appointment
    );
  }

  /**
   * Get the available dates for the provided appointment.
   *
   * @async
   * @param searchRangeLower The lower range (inclusive) of dates to search for appointment availability.
   * @param searchRangeUpper The upper range (inclusive) of dates to search for appointment availability.
   * @protected
   * @returns Promise containing a list of AvailableRescheduleDate
   */
  async rescheduleAvailableDates(
    searchRangeLower: Scalars["Date"],
    searchRangeUpper: Scalars["Date"]
  ): Promise<Array<AvailableRescheduleDate>> {
    const input: Graph.AppointmentRescheduleAvailableDatesInput = {
      appointmentId: this.id,
      searchRangeLower,
      searchRangeUpper
    };

    const response = await this.platformClient.request(
      availableRescheduleDatesQuery,
      { input }
    );

    return response.appointmentRescheduleAvailableDates.availableDates;
  }

  /**
   * Get the available appointment times on a particular date for the provided appointment.
   *
   * @async
   * @param date The date that should be searched for available times.
   * @protected
   * @returns Promise containing a list of AvailableRescheduleTime
   * @todo Timezone support
   */
  async rescheduleAvailableTimes(
    date: Scalars["Date"]
  ): Promise<Array<AvailableRescheduleTime>> {
    const input: Graph.AppointmentRescheduleAvailableTimesInput = {
      appointmentId: this.id,
      date
    };

    const response = await this.platformClient.request(
      availableRescheduleTimesQuery,
      { input }
    );

    return response.appointmentRescheduleAvailableTimes.availableTimes;
  }

  /**
   * Cancel an Appointment.
   *
   * @async
   * @protected
   * @returns Promise containing the updated Appointment
   */
  async cancel(notes?: string): Promise<Appointment> {
    const input: Graph.CancelAppointmentInput = {
      id: this.id,
      notes
    };

    const response = await this.platformClient.request(
      cancelAppointmentMutation,
      { input }
    );

    return new Appointment(
      this.platformClient,
      response.cancelAppointment.appointment
    );
  }

  /**
   * Fetch the Client for this appointment.
   *
   * @async
   * @returns Promise containing the Client
   */
  async getClient(): Promise<Client> {
    const response = await this.platformClient.request(appointmentClientQuery, {
      id: this.id
    });

    return new Client(this.platformClient, response.appointment.client);
  }

  /**
   * Fetch the Location for this appointment.
   *
   * @async
   * @returns Promise containing the Client
   */
  async getLocation(): Promise<Location> {
    const response = await this.platformClient.request(
      appointmentLocationQuery,
      {
        id: this.id
      }
    );

    return new Location(this.platformClient, response.appointment.location);
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
   * @returns Promise containing the Appointment
   */
  async get(id: Scalars["ID"]): Promise<Appointment> {
    const response = await this.platformClient.request(appointmentQuery, {
      id
    });

    return new Appointment(this.platformClient, response.appointment);
  }

  /**
   * List appointments for the authenticated client
   *
   * @async
   * @protected
   * @returns Promise containing the list of Appointments
   * @todo Pagination
   */
  async list(): Promise<Array<Appointment>> {
    const response = await this.platformClient.request(myAppointmentsQuery, {
      first: 100
    });

    return response.myAppointments.edges.map(
      (edge: Graph.AppointmentEdge) => edge.node
    );
  }
}
export {
  Appointment,
  Appointments,
  AppointmentCancellation,
  AppointmentService,
  AppointmentState,
  AvailableRescheduleTime,
  AvailableRescheduleDate,
  CalendarLinks
};
