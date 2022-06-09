import { createAction, props } from '@ngrx/store';

interface Vehicle {}

const getVehiclesByMade = createAction(
  '[Vehicles] Get Vehicles by Made',
  props<{ made: string }>()
);
const getVehiclesByMadeError = createAction(
  '[Vehicles] Get Vehicles by Made',
  props<{ error: string }>()
);
const getVehiclesByMadeComplete = createAction(
  '[Vehicles] Get Vehicles by Made',
  props<{ vehicles: Vehicle[] }>()
);

const getVehiclesByQuery = createAction(
  '[Vehicles] Get Vehicles by query',
  props<{ query: string }>()
);
const getVehiclesByQueryError = createAction(
  '[Vehicles] Get Vehicles by query',
  props<{ error: string }>()
);
const getVehiclesByQueryComplete = createAction(
  '[Vehicles] Get Vehicles by query',
  props<{ vehicles: Vehicle[] }>()
);

export const VehiclesActions = {
  getVehiclesByMade,
  getVehiclesByMadeComplete,
  getVehiclesByMadeError,
  getVehiclesByQuery,
  getVehiclesByQueryComplete,
  getVehiclesByQueryError
};
