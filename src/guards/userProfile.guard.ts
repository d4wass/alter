import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { UserFacade } from 'src/+state/facade/user/user.facade';
import { AppActions } from '../+state/app-state/app-state.actions';

@Injectable({ providedIn: 'root' })
export class UserProfileGuard {
  constructor(
    private router: Router,
    private userFacade: UserFacade,
    private store: Store
  ) {}

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
