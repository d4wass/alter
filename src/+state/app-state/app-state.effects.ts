import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ModalLoginService } from 'src/services/modal-login/modal-login-service.service';
import { VehicleService } from 'src/services/vehicle-service/vehicle.service';
import { AppActions } from './app-state.actions';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private modalLoginService: ModalLoginService,
    private vehicleService: VehicleService
  ) {}

  handleModalVisibility = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(AppActions.openModal, AppActions.closeModal),
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

  setInitialData = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(AppActions.loadInitialData),
        switchMap(() => {
          return this.vehicleService.getVehicleBrands().pipe(
            map((brands) => AppActions.setInitialData({ brands })),
            catchError((error) => of(AppActions.setInitialDataError({ error })))
          );
        })
      )
  );
}
