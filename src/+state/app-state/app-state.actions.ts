import { createAction, props } from '@ngrx/store';

const openModal = createAction('[Navigation] Open modal', props<{ isModalOpen: boolean }>());
const closeModal = createAction('[Navigation] Close modal', props<{ isModalOpen: boolean }>());
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

const editProfileUser = createAction(
  '[Profile View] Edit user profile',
  props<{ isProfile: boolean }>()
);
//here on saveProfileUser dispatching on backend changes for user
const saveProfileUser = createAction('[Profile View] Save user profile');
const editProfileUserClose = createAction(
  '[Profile View] Edit user profile view close',
  props<{ isProfile: boolean }>()
);

export const AppActions = {
  openModal,
  closeModal,
  closeLoginModalOnEvent,
  setLoginModalToSignUpView,
  setLoginModalToSingUpEmailView,
  setLoginModalToLoginView,
  editProfileUser,
  saveProfileUser,
  editProfileUserClose
};
