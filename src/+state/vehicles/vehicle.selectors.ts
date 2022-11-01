import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Vehicle } from '../models/vehicle.model';
import { VEHICLE_FEATURE, VehicleState } from './vehicle.reducer';
import * as fromVehicles from './vehicle.reducer';

const vehicleFeatureSelector = createFeatureSelector<VehicleState>(VEHICLE_FEATURE);
const selectVehiclesState = createSelector(vehicleFeatureSelector, (state) => state);

const selectAllVehicles = createSelector(
  vehicleFeatureSelector,
  fromVehicles.vehicleSelector.selectAll
);
const selectIsLoading = createSelector(vehicleFeatureSelector, (state) => state.isLoading);
const selectIsVehiclesFound = createSelector(
  vehicleFeatureSelector,
  fromVehicles.vehicleSelector.selectIds
);

export const VehicleSelectors = {
  selectIsLoading,
  selectVehiclesState,
  selectAllVehicles,
  selectIsVehiclesFound
};
