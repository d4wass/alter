import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserVehicleState, USER_VEHICLES_FEATURE } from './user-vehicles.reducer';

const userFeatureSelector = createFeatureSelector<UserVehicleState>(USER_VEHICLES_FEATURE);

const selectUserVehicles = createSelector(userFeatureSelector, (state) => state.entities);
const selectUserVehiclesIds = createSelector(userFeatureSelector, (state) => state.ids);

export const UserVehiclesSelectors = {
  selectUserVehiclesIds,
  selectUserVehicles
};
