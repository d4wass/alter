import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { VehiclesActions } from './vehicle.actions';
import { Vehicle } from '../models/vehicle.model';

export const VEHICLE_FEAURE = 'vehicles';
export const VEHICLE = 'weatherSearchedVehicles';

//w miejsce any dodac cos na interface ktory typuje nasz state dla Vehicle
export const adapter: EntityAdapter<Vehicle> = createEntityAdapter({
  selectId: (vehicle) => vehicle._id
});

export const vehicleSelector = adapter.getSelectors();

export interface VehicleState extends EntityState<Vehicle> {
  isLoading: boolean;
}

export const initialState: VehicleState = adapter.getInitialState({
  isLoading: false
});

const reducer = createReducer(
  initialState,
  // on(VehiclesActions.getVehiclesByQuerySuccess, (state, { vehicles }) => {
  //   return adapter.addMany(vehicles, state);
  // })
  on(VehiclesActions.loadVehicles, (state) => ({ ...state, isLoading: true })),
  on(VehiclesActions.loadVehiclesSuccess, (state, { vehicles }) => {
    return adapter.setAll(vehicles, { ...state, isLoading: false });
  })
);

export function vehiclesReducer(state: VehicleState | undefined, actions: Action): VehicleState {
  return reducer(state, actions);
}
