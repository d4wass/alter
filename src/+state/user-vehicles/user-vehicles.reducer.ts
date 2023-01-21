import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { UserVehicles } from '../models/user-vehicles.model';
import { UserActions } from '../user/user.actions';
import { UserVehiclesActions } from './user-vehicles.actions';

export const USER_VEHICLES_FEATURE = 'userVehicles';
export const adapter: EntityAdapter<UserVehicles> = createEntityAdapter({
  selectId: (vehicle) => vehicle._id
});

export interface UserVehicleState extends EntityState<UserVehicles> {}
const initialState: UserVehicleState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(UserActions.getUserProfileSuccess, (state, { user }) => ({
    ...state,
    ids: user.vehicles
  })),
  on(UserVehiclesActions.getVehiclesSucces, (state, { vehicle }) => adapter.addOne(vehicle, state))
);

export function userVehicleReducer(
  state: UserVehicleState | undefined,
  actions: Action
): UserVehicleState {
  return reducer(state, actions);
}
