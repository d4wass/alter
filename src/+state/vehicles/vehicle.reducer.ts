import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { VehiclesActions } from './vehicle.actions';
import { Vehicle } from '../models/vehicle.model';

export const VEHICLE_FEATURE = 'vehicles';

export const adapter: EntityAdapter<Vehicle> = createEntityAdapter({
  selectId: (vehicle) => vehicle._id
});

export const vehicleSelector = adapter.getSelectors();

export interface VehicleState extends EntityState<Vehicle> {
  isLoading: boolean;
  query?: { place: string; fromDate: string; endDate: string };
}

const initialState: VehicleState = adapter.getInitialState({
  isLoading: false
});

const reducer = createReducer(
  initialState,
  on(VehiclesActions.loadVehicles, (state) => ({ ...state, isLoading: true })),
  on(VehiclesActions.loadVehiclesSuccess, (state, { vehicles }) => {
    return adapter.setAll(vehicles, { ...state, isLoading: false });
  }),
  on(VehiclesActions.searchVehicles, (state, { query }) => ({ ...state, query }))
);

export function vehiclesReducer(state: VehicleState | undefined, actions: Action): VehicleState {
  return reducer(state, actions);
}
