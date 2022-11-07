import { createAction, props } from '@ngrx/store';
import { Reservation } from '../models/reservation.model';
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

const vehicleReservation = createAction(
  '[Selected Vehicle] Preform vehicle reservation',
  props<{
    reservation: Reservation;
  }>()
);
const vehicleReservationSuccess = createAction(
  '[Selected Vehicle] Preform vehicle reservation success'
);
const vehicleReservationError = createAction(
  '[Selected Vehicle] Preform vehicle reservation error',
  props<{ error: string }>()
);

export const VehiclesActions = {
  searchVehicles,
  loadVehicles,
  loadVehiclesSuccess,
  loadVehiclesError,
  vehicleReservation,
  vehicleReservationSuccess,
  vehicleReservationError
};
