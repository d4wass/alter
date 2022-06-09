import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

interface userState {
  isLoading: boolean;
  isAuthorized: boolean;
  isHost: boolean;
  token: string;
  errorMsg: string;
}

export const initialState: userState = {
  isLoading: false,
  isAuthorized: false,
  token: '',
  isHost: false,
  errorMsg: ''
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginUser, (state) => ({ ...state, isLoading: true })),
  on(UserActions.loginUserComplete, (state, { token }) => ({
    ...state,
    isAuthorized: true,
    isLoading: false,
    token
  })),
  on(UserActions.loginUserError, (state, { error }) => ({ ...state, errorMsg: error }))
);
