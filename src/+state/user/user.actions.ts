import { createAction, props } from '@ngrx/store';
import { Credentials, UserDataUpdate, User, UserDataToUpdate } from '../models/user.model';

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

const getUserProfile = createAction(
  '[User Login Modal] Get User Profile',
  props<{ token: string }>()
);

const getUserProfileSuccess = createAction(
  '[User Login Modal] Get User Profile success',
  props<{ user: Partial<User> }>()
);
const getUserProfileError = createAction(
  '[User Login Modal] Get User Profile error',
  props<{ error: string }>()
);

const updateUserProfile = createAction(
  '[User Profile] Update user profile',
  props<{ updateUser: UserDataToUpdate; token: string }>()
);
const updateUserProfileSuccess = createAction(
  '[User Profile] Update user profile success',
  props<{ user: Partial<User>; token: string }>()
);
const updateUserProfileError = createAction(
  '[User Profile] Update user profile error',
  props<{ error: string }>()
);

const validateUserDataUpdate = createAction(
  '[User Modal Profile] Validate user credentials',
  props<{ updateUser: UserDataUpdate }>()
);
const validateUserDataUpdateSuccess = createAction(
  '[User Modal Profile] Validate user credentials success',
  props<{ isPasswordValid: boolean; isMobileValid: boolean }>()
);
const validateUserDataUpdateError = createAction(
  '[User Modal Profile] Validate user credentials error',
  props<{ error: string }>()
);

const addUserVehicle = createAction(
  '[Vehicle Form] Add user vehicle',
  props<{ userId: string; vehicle: any; token: string }>()
);
const addUserVehicleSuccess = createAction(
  '[Vehicle Form] Add user vehicle success',
  props<{ vehicleId: string }>()
);
const addUserVehicleError = createAction(
  '[Vehicle Form] Add user vehicle error',
  props<{ error: string }>()
);

export const UserActions = {
  login,
  loginSuccess,
  loginError,
  createUser,
  createUserSuccess,
  createUserError,
  getUserProfile,
  getUserProfileSuccess,
  getUserProfileError,
  logoutUser,
  logoutUserError,
  logoutUserSuccess,
  updateUserProfile,
  updateUserProfileSuccess,
  updateUserProfileError,
  validateUserDataUpdate,
  validateUserDataUpdateSuccess,
  validateUserDataUpdateError,
  addUserVehicle,
  addUserVehicleSuccess,
  addUserVehicleError
};
