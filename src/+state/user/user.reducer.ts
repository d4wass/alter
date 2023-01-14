import { createReducer, on } from '@ngrx/store';
import { User, UserDataProfile } from '../models/user.model';
import { ReservationActions } from '../reservation/reservation.actions';
import { UserActions } from './user.actions';

export const USER_FEATURE = 'user';

export interface UserState {
  isLoading: boolean;
  isAuthorized: boolean;
  isHost: boolean;
  token: string;
  errorMsg: string;
  isCredentialsAreValid: boolean;
  userVehicle: { id: string; isSuccessfullCreated: boolean };
  userProfile: UserDataProfile;
  reservations: any[];
  populatedReservations: any[];
  vehicles: any[];
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
  },
  reservations: [],
  populatedReservations: [],
  vehicles: []
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
    const { firstName, lastName, email, id, reservations, vehicles } = user;

    if (reservations?.length && vehicles?.length) {
      return {
        ...state,
        reservations: [...reservations],
        vehicles: [...vehicles]
      };
    }
    return {
      ...state,
      userProfile: { firstName, lastName, email, id },
      reservations,
      vehicles
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
  })),
  on(ReservationActions.populateUserReservationsSuccess, (state, { populatedReservations }) => ({
    ...state,
    populatedReservations: [...state.populatedReservations, populatedReservations]
  }))
);
