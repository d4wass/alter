import { createAction, props } from '@ngrx/store';
import { UserDataUpdate, User, UserDataToUpdate, UserDataProfile } from '../models/user.model';

const login = createAction(
  '[User Login Modal] Login User',
  props<{ email: string; password: string }>()
);
const loginSuccess = createAction(
  '[User Login Modal] Login User Success',
  props<{ token: string }>()
);
const loginError = createAction('[User Login Modal] Login User Error', props<{ error: string }>());

const logoutUser = createAction('[User Profile] Logout User');
const logoutUserSuccess = createAction('[User Profile] Logout User');
const logoutUserError = createAction('[User Profile] Logout User', props<{ error: string }>());

const createUser = createAction(
  '[User Create Modal] Create User',
  props<{ user: Partial<User> }>()
);
const createUserSuccess = createAction('[User Create Modal] Create User Success', props<any>());
const createUserError = createAction(
  '[User Create Modal] Create User Error',
  props<{ error: string }>()
);

const getUserProfile = createAction(
  '[User Login Modal] Get User Profile',
  props<{ token: string }>()
);

const getUserProfileSuccess = createAction(
  '[User Login Modal] Get User Profile Success',
  props<{ user: UserDataProfile }>()
);
const getUserProfileError = createAction(
  '[User Login Modal] Get User Profile Error',
  props<{ error: string }>()
);

const updateUserProfile = createAction(
  '[User Profile] Update User Profile',
  props<{ updateUser: UserDataToUpdate; token: string }>()
);
const updateUserProfileSuccess = createAction(
  '[User Profile] Update User Profile Success',
  props<{ user: Partial<User>; token: string }>()
);
const updateUserProfileError = createAction(
  '[User Profile] Update User Profile Error',
  props<{ error: string }>()
);

const validateUserDataUpdate = createAction(
  '[User Modal Profile] Validate User Credentials',
  props<{ updateUser: UserDataUpdate }>()
);
const validateUserDataUpdateSuccess = createAction(
  '[User Modal Profile] Validate User Credentials Success',
  props<{ isPasswordValid: boolean; isMobileValid: boolean }>()
);
const validateUserDataUpdateError = createAction(
  '[User Modal Profile] Validate User Credentials Error',
  props<{ error: string }>()
);

const addUserVehicle = createAction('[Vehicle Form] Add User Vehicle', props<{ vehicle: any }>());
const addUserVehicleSuccess = createAction(
  '[Vehicle Form] Add User Vehicle Success',
  props<{ vehicleId: string }>()
);
const addUserVehicleError = createAction(
  '[Vehicle Form] Add user Vehicle Error',
  props<{ error: string }>()
);

const vehicleResetForm = createAction('[Vehicle Form] Clear Vehicle Form');
const confirmUserReservation = createAction(
  '[Reservation Summary] Confirm User Reservation',
  props<{ reservationId: string }>()
);
const confirmUserReservationSuccess = createAction(
  '[Reservation Summary] Confirm User Reservation Success',
  props<{ reservation: any }>()
);
const confirmUserReservationError = createAction(
  '[Reservation Summary] Confirm User Reservation Error',
  props<{ error: any }>()
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
  addUserVehicleError,
  vehicleResetForm,
  confirmUserReservation,
  confirmUserReservationSuccess,
  confirmUserReservationError
};
