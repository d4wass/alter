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

export const ReservationActions = {
  createReservation,
  createReservationSuccess,
  createReservationError
};
