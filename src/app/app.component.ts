import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from 'src/+state/app-state/app-state.actions';

@Component({
    selector: 'app-root',
    template: `
    <app-login-modal></app-login-modal>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'Alter';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.loadInitialData());
  }
}
