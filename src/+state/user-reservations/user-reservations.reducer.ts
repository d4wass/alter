import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { UserReservations } from '../models/user-reservations.model';
import { ReservationActions } from '../reservation/reservation.actions';
import { UserActions } from '../user/user.actions';

export const USER_RESERVATIONS_FEATURE = 'userReservations';
export const adapter: EntityAdapter<UserReservations> = createEntityAdapter({
  selectId: (vehicle) => vehicle._id
});

export interface UserReservationsState extends EntityState<UserReservations> {}
const initialState: UserReservationsState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(UserActions.getUserProfileSuccess, (state, { user }) => ({
    ...state,
    ids: user.reservations
  })),
  on(ReservationActions.populateUserReservationsSuccess, (state, { populatedReservations }) =>
    adapter.addOne(populatedReservations, state)
  ),
  on(UserActions.logoutUser, () => initialState)
);

export function userReservationsReducer(
  state: UserReservationsState | undefined,
  actions: Action
): UserReservationsState {
  return reducer(state, actions);
}
