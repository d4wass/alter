import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, USER_FEATURE } from './user.reducer';

const userFeatureSelector = createFeatureSelector<UserState>(USER_FEATURE);
const selectUserState = createSelector(userFeatureSelector, (state) => state);

const selectIsAuthorized = createSelector(userFeatureSelector, (state) => state.isAuthorized);
const selectUserName = createSelector(userFeatureSelector, (state) => state.userProfile.firstName);
const selectUserLastName = createSelector(
  userFeatureSelector,
  (state) => state.userProfile.lastName
);
const selectUserEmail = createSelector(userFeatureSelector, (state) => state.userProfile.email);
const selectUserToken = createSelector(userFeatureSelector, (state) => state.token);

export const UserSelectors = {
  selectIsAuthorized,
  selectUserName,
  selectUserLastName,
  selectUserEmail,
  selectUserToken
};
