import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, APP_FEATURE } from './app-state.reducer';

const appStateFeatureSelector = createFeatureSelector<AppState>(APP_FEATURE);
const selectAppState = createSelector(appStateFeatureSelector, (state) => state);

const selectIsLoginModalOpen = createSelector(
  appStateFeatureSelector,
  (state) => state.isLoginModalOpen
);
const selectIsEditProfile = createSelector(appStateFeatureSelector, (state) => state.isEditProfile);

export const AppSelectors = {
  selectIsEditProfile,
  selectIsLoginModalOpen
};
