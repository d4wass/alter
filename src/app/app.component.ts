import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginModalComponent } from '@project/components/organisms/login-modal/login-modal.component';
import { AppActions } from 'src/+state/app-state/app-state.actions';

@Component({
  selector: 'app-root',
  template: `
    <app-login-modal></app-login-modal>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [LoginModalComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Alter';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.loadInitialData());
  }
}
