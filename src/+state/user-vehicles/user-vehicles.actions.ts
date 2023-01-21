import { createAction, props } from '@ngrx/store';
import { Vehicle } from '../models/vehicle.model';

const getVehicles = createAction(
  '[User Profile Vehicles] Get User Vehicles',
  props<{ vehicles: string[] | number[] }>()
);
const getVehiclesSucces = createAction(
  '[User Profile Vehicles] Get User Vehicles Success',
  props<{ vehicle: Vehicle }>()
);

const getVehiclesError = createAction(
  '[User Profile Vehicles] Get User Vehicles Error',
  props<{ error: string }>()
);

const removeVehicle = createAction(
  '[User Profile Vehicles] Remove User Vehicle',
  props<{ vehicleId: string }>()
);

const removeVehicleSuccess = createAction(
  '[User Profile Vehicles] Remove User Vehicle Success',
  props<{ removed: any }>()
);

const removeVehicleError = createAction(
  '[User Profile Vehicles] Remove User Vehicle',
  props<{ error: string }>()
);

export const UserVehiclesActions = {
  getVehicles,
  getVehiclesSucces,
  getVehiclesError,
  removeVehicle,
  removeVehicleSuccess,
  removeVehicleError
};
