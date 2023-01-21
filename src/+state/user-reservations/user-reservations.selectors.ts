import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserReservationsState, USER_RESERVATIONS_FEATURE } from './user-reservations.reducer';

const userFeatureSelector = createFeatureSelector<UserReservationsState>(USER_RESERVATIONS_FEATURE);

const selectUserReservations = createSelector(userFeatureSelector, (state) => state.entities);
const selectUserReservstionsIds = createSelector(userFeatureSelector, (state) => state.ids);

export const UserReservationsSelectors = {
  selectUserReservations,
  selectUserReservstionsIds
};
