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

export const UserVehiclesActions = {
  getVehicles,
  getVehiclesSucces,
  getVehiclesError
};
