import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/project/services/auth-service/auth.service';
import { ModalLoginService } from 'src/project/services/modal-login/modal-login-service.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private modalService: ModalLoginService
  ) {}

  login = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserActions.login),
        exhaustMap(({ email, password }) => {
          return this.authService.loginUser(email, password).pipe(
            map(({ access_token }) => UserActions.loginSuccess({ token: access_token })),
            catchError(async (error) => UserActions.loginError({ error }))
          );
        })
      )
  );

  loginSuccess = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        switchMap(({ token }) => {
          return this.authService.getUserProfile(token).pipe(
            map(({ email, firstName, lastName, id }) => {
              return UserActions.getUserProfileSuccess({
                user: { email, firstName, lastName, id }
              });
            }),
            catchError(async (error) => UserActions.getUserProfileError({ error }))
          );
        })
      )
  );

  closeLoginOnSuccessful = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserActions.getUserProfileSuccess),
        tap(() => this.modalService.setModalToInitialState())
      ),
    { dispatch: false }
  );
}
