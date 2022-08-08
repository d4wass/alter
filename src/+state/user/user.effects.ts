import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/project/services/auth-service/auth.service';
import { ModalLoginService } from 'src/project/services/modal-login/modal-login-service.service';
import { AppActions } from '../app-state/app-state.actions';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private modalService: ModalLoginService,
    private router: Router
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

  createUser = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserActions.createUser),
        switchMap(({ user }) => {
          return this.authService.createUser(user).pipe(
            map(({ createdUser }: any) => UserActions.createUserSuccess({ createdUser })),
            catchError(async (error) => UserActions.createUserError({ error }))
          );
        })
      )
  );

  closeModal = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserActions.getUserProfileSuccess, UserActions.createUserSuccess),
        map(() => {
          this.modalService.setModalToInitialState();
          return AppActions.closeModal({ isModalOpen: false });
        })
      )
  );

  logout = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserActions.logoutUser),
        tap((x) => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );
}
