import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, USER_FEATURE } from './user.reducer';

const userFeatureSelector = createFeatureSelector<UserState>(USER_FEATURE);
//! did we use that selector to something? check selectors proper construction
const selectUserState = createSelector(userFeatureSelector, (state) => state);

const selectIsAuthorized = createSelector(userFeatureSelector, (state) => state.isAuthorized);
const selectUserName = createSelector(userFeatureSelector, (state) => state.userProfile.firstName);
const selectUserLastName = createSelector(
  userFeatureSelector,
  (state) => state.userProfile.lastName
);
const selectUserEmail = createSelector(userFeatureSelector, (state) => state.userProfile.email);
const selectUserToken = createSelector(userFeatureSelector, (state) => state.token);
const selectUserMobile = createSelector(userFeatureSelector, (state) => state.userProfile.mobile);
const selectUserId = createSelector(userFeatureSelector, (state) => state.userProfile.id);
const selectUserVehicleCreationInfo = createSelector(
  userFeatureSelector,
  (state) => state.userVehicle
);
const selectUserReservations = createSelector(userFeatureSelector, (state) => state.reservations);
const selectUserVehicles = createSelector(userFeatureSelector, (state) => state.vehicles);
const selectUserPopulatedReservations = createSelector(
  userFeatureSelector,
  (state) => state.populatedReservations
);

export const UserSelectors = {
  selectIsAuthorized,
  selectUserName,
  selectUserLastName,
  selectUserEmail,
  selectUserToken,
  selectUserMobile,
  selectUserId,
  selectUserVehicleCreationInfo,
  selectUserReservations,
  selectUserVehicles,
  selectUserPopulatedReservations
};
