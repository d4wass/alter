import { createAction, props } from '@ngrx/store';

const openModal = createAction('[Navigation] Open modal', props<{ isLoginModalOpen: boolean }>());
const closeModal = createAction('[Navigation] Close modal', props<{ isLoginModalOpen: boolean }>());
const closeLoginModalOnEvent = createAction('[Login Modal] Close login modal from event');
const setLoginModalToSignUpView = createAction(
  '[Login Modal] Set login modal to sign up view',
  props<{ isSignUp: boolean }>()
);
const setLoginModalToSingUpEmailView = createAction(
  '[Login Modal] Set login modal to sign up by email view',
  props<{ isEmail: boolean }>()
);
const setLoginModalToLoginView = createAction(
  '[Login Modal] Set login modal to login view',
  props<{ isLogin: boolean }>()
);

//here on saveProfileUser dispatching on backend changes for user
const saveProfileUser = createAction('[Profile View] Save user profile');
const openEditProfileUser = createAction(
  '[User Profile View] Open Edit user profile',
  props<{ isProfile: boolean }>()
);
const closeEditProfileUser = createAction(
  '[User Profile View] Close Edit user profile',
  props<{ isProfile: boolean }>()
);

export const AppActions = {
  openModal,
  closeModal,
  closeLoginModalOnEvent,
  setLoginModalToSignUpView,
  setLoginModalToSingUpEmailView,
  setLoginModalToLoginView,
  openEditProfileUser,
  saveProfileUser,
  closeEditProfileUser
};
