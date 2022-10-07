import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { AppActions } from './app-state.actions';

export const APP_FEATURE = 'app';

export interface AppState {
  isLoginModalOpen: boolean;
  isEditProfile: boolean;
}

export const initialState: AppState = {
  isLoginModalOpen: false,
  isEditProfile: false
};

export const AppReducer = createReducer(
  initialState,
  on(AppActions.openModal, AppActions.closeModal, (state, { isLoginModalOpen }) => ({
    ...state,
    isLoginModalOpen
  })),
  on(AppActions.closeLoginModalOnEvent, (state) => ({ ...state, isLoginModalOpen: false })),
  on(AppActions.openEditProfileUser, (state, { isProfile }) => ({
    ...state,
    isEditProfile: isProfile
  })),
  on(AppActions.closeEditProfileUser, (state, { isProfile }) => ({
    ...state,
    isEditProfile: isProfile
  }))
);
