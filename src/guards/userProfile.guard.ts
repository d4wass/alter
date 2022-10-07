import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, tap, take, of } from 'rxjs';
import { UserFacade } from 'src/+state/facade/user.facade';
import { AppActions } from '../+state/app-state/app-state.actions';

@Injectable({ providedIn: 'root' })
export class UserProfileGuard implements CanActivate {
  constructor(private router: Router, private userFacade: UserFacade, private store: Store) {}

  canActivate(): Observable<boolean> | boolean {
    return this.userFacade.isAuthorized$.pipe(
      map((authenticate) => {
        if (!authenticate) {
          this.router.navigateByUrl('/');
          this.store.dispatch(AppActions.openModal({ isLoginModalOpen: true }));
        }
        return true;
      })
    );
  }
}
