import { gql } from "graphql-request";
import { fragments as servicesFragments } from "../services/graph";
import { fragments as staffFragments } from "../staff/graph";
import { fragments as locationsFragments } from "../locations/graph";
import { fragments as clientsFragments } from "../clients/graph";

const fragments = gql`
  ${servicesFragments}
  ${staffFragments}
  fragment AppointmentServiceProperties on AppointmentService {
    duration
    endAt
    price
    service {
      ...ServiceProperties
    }
    staff {
      ...StaffProperties
    }
    staffRequested
    startAt
    startTimeOffset
    totalDuration2
  }

  fragment AppointmentProperties on Appointment {
    id
    duration
    cancelled
    state
    startAt
    endAt
    createdAt
    notes
    appointmentServices {
      ...AppointmentServiceProperties
    }
    calendarLinks {
      icsDownload
      googleCalendar
      microsoftOffice
      microsoftOutlook
      yahooCalendar
    }
    cancellation {
      cancelledAt
      notes
      reason
    }
  }
`;

export const appointmentQuery = gql`
  ${fragments}
  query Appointment($id: ID!, $cartId: ID) {
    appointment(id: $id, cartId: $cartId) {
      ...AppointmentProperties
    }
  }
`;

export const appointmentClientQuery = gql`
  ${clientsFragments}
  query Appointment($id: ID!) {
    appointment(id: $id) {
      client {
        ...ClientProperties
      }
    }
  }
`;

export const appointmentLocationQuery = gql`
  ${locationsFragments}
  query Appointment($id: ID!) {
    appointment(id: $id) {
      location {
        ...LocationProperties
      }
    }
  }
`;

export const availableRescheduleTimesQuery = gql`
  query AppointmentRescheduleAvailableTimes(
    $input: AppointmentRescheduleAvailableTimesInput!
  ) {
    appointmentRescheduleAvailableTimes(input: $input) {
      availableTimes {
        bookableTimeId
        startTime
      }
    }
  }
`;

export const availableRescheduleDatesQuery = gql`
  query AppointmentRescheduleAvailableDates(
    $input: AppointmentRescheduleAvailableDatesInput!
  ) {
    appointmentRescheduleAvailableDates(input: $input) {
      availableDates {
        date
      }
    }
  }
`;

export const cancelAppointmentMutation = gql`
  ${fragments}
  mutation CancelAppointment($input: CancelAppointmentInput!) {
    cancelAppointment(input: $input) {
      appointment {
        ...AppointmentProperties
      }
    }
  }
`;

export const appointmentRescheduleMutation = gql`
  ${fragments}
  mutation AppointmentReschedule($input: AppointmentRescheduleInput!) {
    appointmentReschedule(input: $input) {
      appointment {
        ...AppointmentProperties
      }
    }
  }
`;

export const myAppointmentsQuery = gql`
  ${fragments}
  query MyAppointments(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $query: QueryString
  ) {
    myAppointments(
      after: $after
      before: $before
      first: $first
      last: $last
      query: $query
    ) {
      edges {
        cursor
        node {
          ...AppointmentProperties
        }
      }
    }
  }
`;
