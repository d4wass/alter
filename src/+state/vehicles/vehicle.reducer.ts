import { createReducer } from '@ngrx/store';

interface Vehicle {}

interface vehicleState {
  isLoading: boolean;
  vehicles: Vehicle[];
}

export const initialState: vehicleState = {
  isLoading: false,
  vehicles: []
};

export const vehiclesReducer = createReducer(initialState);
