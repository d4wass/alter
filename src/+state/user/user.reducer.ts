import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { UserActions } from './user.actions';

export const USER_FEATURE = 'user';

export interface UserState {
  isLoading: boolean;
  isAuthorized: boolean;
  isHost: boolean;
  token: string;
  errorMsg: string;
  isCredentialsAreValid: boolean;
  userProfile: Partial<User>;
}

export const initialState: UserState = {
  isLoading: false,
  isAuthorized: false,
  token: '',
  isHost: false,
  errorMsg: '',
  isCredentialsAreValid: false,
  userProfile: {}
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
  on(UserActions.getUserProfileError, (state, { error }) => ({
    ...state,
    errorMsg: error
  })),
  on(UserActions.logoutUser, (state) => ({ ...state, isAuthorized: false, userProfile: {} })),
  on(UserActions.validateUserDataUpdateSuccess, (state) => state)
);
