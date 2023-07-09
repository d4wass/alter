import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { UserReservationsSelectors } from '../../user-reservations/user-reservations.selectors';
import { UserVehiclesSelectors } from '../../user-vehicles/user-vehicles.selectors';
import { UserSelectors } from '../../user/user.selectors';

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
    select(UserReservationsSelectors.selectUserReservations)
  );
  userReservationsIds$: Observable<any> = this.store.pipe(
    select(UserReservationsSelectors.selectUserReservstionsIds)
  );
  userVehicles$: Observable<any> = this.store.pipe(
    select(UserVehiclesSelectors.selectUserVehicles)
  );
  userVehiclesId$: Observable<string[] | number[]> = this.store.pipe(
    select(UserVehiclesSelectors.selectUserVehiclesIds)
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
