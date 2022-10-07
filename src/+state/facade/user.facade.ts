import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  constructor(private store: Store) {}
}
