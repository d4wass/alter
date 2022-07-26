import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { ModalLoginService } from 'src/project/services/modal-login/modal-login-service.service';
import { AppActions } from './app-state.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private modalLoginService: ModalLoginService) {}

  handleModalVisibility = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(AppActions.openLoginModal, AppActions.closeLoginModal),
        tap(({ isLoginModalOpen }) => this.modalLoginService.setModalVisibility(isLoginModalOpen))
      ),
    { dispatch: false }
  );

  setModalToInitialStateAfterClose = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(AppActions.closeLoginModalOnEvent),
        tap(() => this.modalLoginService.setModalToInitialState())
      ),
    { dispatch: false }
  );

  setModalToSignUpView = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(AppActions.setLoginModalToSignUpView),
        tap(({ isSignUp }) => {
          this.modalLoginService.setModalViewState(isSignUp);
          this.modalLoginService.setEmailViewForModal(isSignUp);
        })
      ),
    { dispatch: false }
  );

  setModalToLoginView = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(AppActions.setLoginModalToLoginView),
        tap(({ isLogin }) => {
          this.modalLoginService.setModalViewState(isLogin);
        })
      ),
    { dispatch: false }
  );

  setModalToSignUpEmailView = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(AppActions.setLoginModalToSingUpEmailView),
        tap(({ isEmail }) => {
          this.modalLoginService.setEmailViewForModal(isEmail);
        })
      ),
    { dispatch: false }
  );
}
