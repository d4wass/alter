import { createAction, props } from '@ngrx/store';
import { Reservation } from '../models/reservation.model';

const createReservation = createAction(
  '[Reservation Vehicle] Preform vehicle reservation',
  props<{
    reservation: Reservation;
  }>()
);
const createReservationSuccess = createAction(
  '[Reservation Vehicle] Preform vehicle reservation success',
  props<{ reservationId: string }>()
);
const createReservationError = createAction(
  '[Reservation Vehicle] Preform vehicle reservation error',
  props<{ error: string }>()
);

const cancelUserReservation = createAction(
  '[Reservation Summary] Cancel User Reservation',
  props<{ reservationId: string; hostId: string }>()
);
const cancelUserReservationSuccess = createAction('[Reservation Summary] Cancel User Reservation');
const cancelUserReservationError = createAction(
  '[Reservation Summary] Cancel User Reservation',
  props<{ error: any }>()
);

const confirmUserReservation = createAction(
  '[Reservation Summary] Confirm User Reservation',
  props<{ reservationId: string; hostId: string }>()
);
const confirmUserReservationSuccess = createAction(
  '[Reservation Summary] Confirm User Reservation Success',
  props<{ reservation: any }>()
);
const confirmUserReservationError = createAction(
  '[Reservation Summary] Confirm User Reservation Error',
  props<{ error: any }>()
);

const populateUserReservations = createAction(
  '[Reservation User List] Populate user reservations',
  props<{ reservations: any[] }>()
);
const populateUserReservationsSuccess = createAction(
  '[Reservation User List] Populate user reservations success',
  props<{ populatedReservations: any }>()
);
const populateUserReservationsError = createAction(
  '[Reservation User List] Populate user reservations error',
  props<{ error: any }>()
);

export const ReservationActions = {
  createReservation,
  createReservationSuccess,
  createReservationError,
  cancelUserReservation,
  cancelUserReservationSuccess,
  cancelUserReservationError,
  confirmUserReservation,
  confirmUserReservationSuccess,
  confirmUserReservationError,
  populateUserReservations,
  populateUserReservationsSuccess,
  populateUserReservationsError
};
