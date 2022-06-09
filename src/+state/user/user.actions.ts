import { createAction, props } from '@ngrx/store';

const initUser = createAction('Init User');
const loginUser = createAction('[User] Login User', props<{ email: string; password: string }>());
const loginUserComplete = createAction('[User] Login User Complete', props<{ token: string }>());
const loginUserError = createAction('[User] Login User Error', props<{ error: string }>());

export const UserActions = {
  loginUser,
  loginUserComplete,
  loginUserError
};
