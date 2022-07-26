import { createReducer, on } from '@ngrx/store';
import { AppActions } from './app-state.actions';

interface appState {
  isLoginModalOpen: boolean;
}

export const initialState: appState = {
  isLoginModalOpen: false
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.openLoginModal, AppActions.closeLoginModal, (state, { isLoginModalOpen }) => ({
    ...state,
    isLoginModalOpen
  })),
  on(AppActions.closeLoginModalOnEvent, (state) => ({ ...state, isLoginModalOpen: false }))
);
