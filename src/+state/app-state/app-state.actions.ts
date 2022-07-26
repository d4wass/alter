import { createAction, props } from '@ngrx/store';

const openLoginModal = createAction(
  '[Navigation] Open login modal',
  props<{ isLoginModalOpen: boolean }>()
);
const closeLoginModal = createAction(
  '[Navigation] Close login modal',
  props<{ isLoginModalOpen: boolean }>()
);
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

export const AppActions = {
  openLoginModal,
  closeLoginModal,
  closeLoginModalOnEvent,
  setLoginModalToSignUpView,
  setLoginModalToSingUpEmailView,
  setLoginModalToLoginView
};
