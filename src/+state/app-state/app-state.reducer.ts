import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { AppActions } from './app-state.actions';

interface appState {
  isModalOpen: boolean;
  isEditProfile: boolean;
}

export const initialState: appState = {
  isModalOpen: false,
  isEditProfile: false
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.openModal, AppActions.closeModal, (state, { isModalOpen }) => ({
    ...state,
    isModalOpen
  })),
  on(AppActions.closeLoginModalOnEvent, (state) => ({ ...state, isLoginModalOpen: false })),
  on(AppActions.editProfileUser, (state) => ({ ...state, isEditProfile: true }))
);
