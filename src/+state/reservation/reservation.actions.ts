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

export const ReservationActions = {
  createReservation,
  createReservationSuccess,
  createReservationError,
  cancelUserReservation,
  cancelUserReservationSuccess,
  cancelUserReservationError,
  confirmUserReservation,
  confirmUserReservationSuccess,
  confirmUserReservationError
};
