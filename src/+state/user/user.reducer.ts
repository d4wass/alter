import { createReducer, on } from '@ngrx/store';
import { UserDataProfile } from '../models/user.model';
import { UserActions } from './user.actions';

export const USER_FEATURE = 'user';

export interface UserState {
  isLoading: boolean;
  isAuthorized: boolean;
  isHost: boolean;
  token: string;
  errorMsg: string;
  isCredentialsAreValid: boolean;
  userVehicle: {
    id: string;
    isSuccessfullCreated: boolean;
  };
  userProfile: UserDataProfile;
}

export const initialState: UserState = {
  isLoading: false,
  isAuthorized: false,
  token: '',
  isHost: false,
  errorMsg: '',
  isCredentialsAreValid: false,
  userVehicle: { id: '', isSuccessfullCreated: false },
  userProfile: {
    id: '',
    email: '',
    firstName: '',
    lastName: ''
  }
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state) => ({ ...state, isLoading: true })),
  on(UserActions.loginSuccess, (state, { token }) => ({
    ...state,
    isAuthorized: true,
    isLoading: false,
    token
  })),
  on(UserActions.loginError, (state, { error }) => ({ ...state, errorMsg: error })),
  on(UserActions.getUserProfileSuccess, (state, { user }) => ({
    ...state,
    userProfile: { ...user }
  })),

  on(UserActions.getUserProfileSuccess, (state, { user }) => {
    const { firstName, lastName, email, id } = user;
    return {
      ...state,
      userProfile: { firstName, lastName, email, id }
    };
  }),
  on(UserActions.getUserProfileError, (state, { error }) => ({
    ...state,
    errorMsg: error
  })),
  on(UserActions.logoutUser, () => initialState),
  on(UserActions.validateUserDataUpdateSuccess, (state) => state),
  on(UserActions.addUserVehicleSuccess, (state, { vehicleId }) => ({
    ...state,
    userVehicle: { id: vehicleId, isSuccessfullCreated: true }
  })),
  on(UserActions.vehicleResetForm, (state) => ({
    ...state,
    userVehicle: { id: '', isSuccessfullCreated: false }
  }))
);
