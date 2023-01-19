import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { UserSelectors } from '../user/user.selectors';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  isAuthorized$: Observable<boolean> = this.store.pipe(select(UserSelectors.selectIsAuthorized));
  userName$: Observable<string | undefined> = this.store.pipe(select(UserSelectors.selectUserName));
  userLastName$: Observable<string | undefined> = this.store.pipe(
    select(UserSelectors.selectUserLastName)
  );
  userEmail$: Observable<string | undefined> = this.store.pipe(
    select(UserSelectors.selectUserEmail)
  );
  userToken$: Observable<string> = this.store.pipe(select(UserSelectors.selectUserToken));
  userMobile$: Observable<string | undefined> = this.store.pipe(
    select(UserSelectors.selectUserMobile)
  );
  userId$: Observable<string> = this.store.pipe(select(UserSelectors.selectUserId));
  userReservations$: Observable<any> = this.store.pipe(
    select(UserSelectors.selectUserReservations)
  );
  userVehicles$: Observable<any> = this.store.pipe(select(UserSelectors.selectUserVehicles));
  userPopulatedReservations$: Observable<any> = this.store.pipe(
    select(UserSelectors.selectUserPopulatedReservations)
  );

  isUserAuthorized(): Observable<boolean> {
    return this.store.pipe(select(UserSelectors.selectIsAuthorized));
  }

  isVehicleCreated(): Observable<boolean> {
    return this.store.pipe(
      select(UserSelectors.selectUserVehicleCreationInfo),
      map(({ isSuccessfullCreated }) => isSuccessfullCreated)
    );
  }

  constructor(private store: Store) {}
}
