import { Actions, createEffect, ofType, OnRunEffects } from '@ngrx/effects';

import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/project/services/auth-service/auth.service';
import { UserActions } from './user.actions';

export class UserEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      switchMap(({ email, password }) => {
        console.log(email, password);
        return this.authService.loginUser(email, password).pipe(
          map(({ access_token }) => UserActions.loginUserComplete({ token: access_token })),
          catchError((error) => of(UserActions.loginUserError({ error })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
