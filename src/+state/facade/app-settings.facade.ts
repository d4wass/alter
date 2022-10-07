import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppSelectors } from '../app-state/app-state.selectors';

@Injectable({ providedIn: 'root' })
export class AppSettingFacade {
  isEditProfile$: Observable<boolean> = this.store.pipe(select(AppSelectors.selectIsEditProfile));

  constructor(private store: Store) {}
}
