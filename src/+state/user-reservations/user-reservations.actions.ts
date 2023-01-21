import { createAction, props } from '@ngrx/store';

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

export const UserReservationsActions = {
  populateUserReservations,
  populateUserReservationsSuccess,
  populateUserReservationsError
};
