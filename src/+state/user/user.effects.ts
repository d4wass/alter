import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs';
import { AuthService } from 'src/services/auth-service/auth.service';
import { ModalLoginService } from 'src/services/modal-login/modal-login-service.service';
import { UserService } from 'src/services/user-service/user.service';
import { AppActions } from '../app-state/app-state.actions';
import { UserFacade } from '../facade/user.facade';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private modalService: ModalLoginService,
    private router: Router,
    private userFacade: UserFacade
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
        map(({ token }) => {
          return UserActions.getUserProfile({ token });
        })
      )
  );

  getUserProfile = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserActions.getUserProfile),
        switchMap(({ token }) => {
          return this.authService.getUserProfile(token).pipe(
            map(({ firstName, lastName, email, id }) =>
              UserActions.getUserProfileSuccess({ user: { firstName, lastName, email, id } })
            ),
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
        ofType(UserActions.createUserSuccess, UserActions.loginSuccess),
        map(() => {
          this.modalService.setModalToInitialState();
          return AppActions.closeModal({ isLoginModalOpen: false });
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

  validateUserDataUpdate = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserActions.validateUserDataUpdate),
        withLatestFrom(this.userFacade.userToken$),
        concatMap(([{ updateUser }, token]) => {
          return this.authService.validateUserDataUpdate(updateUser, token).pipe(
            map(({ isPasswordValid, isMobileValid }) =>
              UserActions.validateUserDataUpdateSuccess({ isPasswordValid, isMobileValid })
            ),
            catchError(async (error) => UserActions.validateUserDataUpdateError({ error }))
          );
        })
      )
  );

  updateUserData = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserProfile),
        switchMap(({ updateUser, token }) => {
          return this.authService.updateUserData(updateUser, token).pipe(
            map(({ user, token }) => UserActions.updateUserProfileSuccess({ user, token })),
            catchError(async (error) => UserActions.updateUserProfileError({ error }))
          );
        })
      )
  );

  updateUserProfileView = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserProfileSuccess),
        withLatestFrom(this.userFacade.userToken$),
        switchMap(([, token]) => {
          return this.authService.getUserProfile(token).pipe(
            map(({ firstName, lastName, email, id }) =>
              UserActions.getUserProfileSuccess({ user: { firstName, lastName, email, id } })
            ),
            catchError(async (error) => UserActions.getUserProfileError({ error }))
          );
        })
      )
  );
}
