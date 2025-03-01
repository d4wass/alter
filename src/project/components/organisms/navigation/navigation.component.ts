import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginBtnComponent } from '@project/components/atoms/login-btn/login-btn.component';
import { NavigationBarComponent } from '@project/components/molecules/navigation-bar/navigation-bar.component';
import { Observable } from 'rxjs';
import { AppActions } from 'src/+state/app-state/app-state.actions';
import { UserFacade } from 'src/+state/facade/user/user.facade';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationBarComponent, LoginBtnComponent],
  selector: 'app-navigation',
  template: `
    <div>
      <a routerLink="/">
        <img src="assets/Logo.svg" alt="logo" class="logo" />
      </a>
      <app-navigation-bar></app-navigation-bar>
      <app-login-btn
        (isClicked)="handleLoginBtn($event)"
        [isAuthorized]="isAuthorized | async"
        [userName]="userName | async"
      ></app-login-btn>
    </div>
  `,
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(
    private store: Store,
    private userFacade: UserFacade
  ) {}
  isAuthorized: Observable<boolean> = this.userFacade.isAuthorized$;
  userName: Observable<string | undefined> = this.userFacade.userName$;

  handleLoginBtn(isOpen: boolean) {
    this.store.dispatch(AppActions.openModal({ isLoginModalOpen: isOpen }));
  }
}
