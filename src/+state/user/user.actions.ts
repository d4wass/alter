import { createAction, props } from '@ngrx/store';
import { Credentials, UpdateCredentials, User } from '../models/user.model';

const login = createAction(
  '[User Login Modal] Login user',
  props<{ email: string; password: string }>()
);
const loginSuccess = createAction(
  '[User Login Modal] Login user success',
  props<{ token: string }>()
);
const loginError = createAction('[User Login Modal] Login user error', props<{ error: string }>());

const logoutUser = createAction('[User Profile] Logout user');
const logoutUserSuccess = createAction('[User Profile] Logout user');
const logoutUserError = createAction('[User Profile] Logout user', props<{ error: string }>());

const createUser = createAction(
  '[User Create Modal] Create user',
  props<{ user: Partial<User> }>()
);
const createUserSuccess = createAction('[User Create Modal] Create user success', props<any>());
const createUserError = createAction(
  '[User Create Modal] Create user error',
  props<{ error: string }>()
);

const getUserProfileSuccess = createAction(
  '[User Login Modal] Get User Profile success',
  props<{ user: { email: string; firstName: string; id: string; lastName: string } }>()
);
const getUserProfileError = createAction(
  '[User Login Modal] Get User Profile error',
  props<{ error: string }>()
);

const updateUserProfile = createAction(
  '[User Profile] Update user profile',
  props<{ user: Partial<User>; token: string }>()
);
const updateUserProfileSuccess = createAction(
  '[User Profile] Update user profile success',
  props<{ updatedUser: Partial<User> }>()
);
const updateUserProfileError = createAction(
  '[User Profile] Update user profile error',
  props<{ error: string }>()
);

const validateUserPasswordCredentials = createAction(
  '[User Modal Profile] Check user password credentials',
  props<{ updateData: { oldValue: string; newValue: string; confirmValue: string } }>()
);
const validateUserPasswordCredentialsSuccess = createAction(
  '[User Modal Profile] Check user password credentials success',
  props<{ isValid: boolean }>()
);
const validateUserPasswordCredentialsError = createAction(
  '[User Modal Profile] Check user password credentials error',
  props<{ error: string }>()
);

const validateUserMobileCredentials = createAction(
  '[User Modal Profile] Check user mobile credentials',
  props<{ updateData: UpdateCredentials }>()
);
const validateUserMobileCredentialsSuccess = createAction(
  '[User Modal Profile] Check user mobile credentials success',
  props<{ isValid: boolean }>()
);
const validateUserMobileCredentialsError = createAction(
  '[User Modal Profile] Check user mobile credentials error',
  props<{ error: string }>()
);

export const UserActions = {
  login,
  loginSuccess,
  loginError,
  createUser,
  createUserSuccess,
  createUserError,
  getUserProfileSuccess,
  getUserProfileError,
  logoutUser,
  logoutUserError,
  logoutUserSuccess,
  updateUserProfile,
  updateUserProfileSuccess,
  updateUserProfileError,
  validateUserMobileCredentials,
  validateUserMobileCredentialsSuccess,
  validateUserMobileCredentialsError,
  validateUserPasswordCredentials,
  validateUserPasswordCredentialsSuccess,
  validateUserPasswordCredentialsError
};
