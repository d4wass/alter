import { createAction, props } from '@ngrx/store';
import { VehicleQuery } from '../models/vehicle.model';
import { Vehicle } from '../models/vehicle.model';

const searchVehicles = createAction(
  '[Vehicles] Get Vehicles by query',
  props<{ query: VehicleQuery }>()
);
const loadVehicles = createAction('[Vehicles] Load Vehicles');
const loadVehiclesSuccess = createAction(
  '[Vehicles] Load Vehicles Success',
  props<{ vehicles: Vehicle[] }>()
);
const loadVehiclesError = createAction(
  '[Vehicles] Load Vehicles Error',
  props<{ error: string }>()
);

export const VehiclesActions = {
  searchVehicles,
  loadVehicles,
  loadVehiclesSuccess,
  loadVehiclesError
};
