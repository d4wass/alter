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
    <ng-container>
      <a routerLink="/">
        <img src="assets/Logo.svg" alt="logo" class="logo" />
      </a>
      <div
        class="nav-toggle-btn"
        [attr.aria-expanded]="isCollapsed"
        aria-controls="nav-routing"
        (click)="openNavigation()"
      >
        <button>
          <svg fill="var(--button-color)" class="hamburguer" viewBox="0 0 100 100" width="30">
            <rect class="line top" width="80" height="10" x="10" y="25" rx="5"></rect>
            <rect class="line middle" width="80" height="10" x="10" y="45" rx="5"></rect>
            <rect class="line bottom" width="80" height="10" x="10" y="65" rx="5"></rect>
          </svg>
        </button>
      </div>
      <div id="nav-routing" class="nav-routing" [ngClass]="{ collapsed: isCollapsed }">
        <app-navigation-bar></app-navigation-bar>
        <app-login-btn
          (isClicked)="handleLoginBtn($event)"
          [isAuthorized]="isAuthorized | async"
          [userName]="userName | async"
        ></app-login-btn>
      </div>
    </ng-container>
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
  isCollapsed = false;

  handleLoginBtn(isOpen: boolean) {
    this.store.dispatch(AppActions.openModal({ isLoginModalOpen: isOpen }));
  }

  openNavigation() {
    this.isCollapsed = !this.isCollapsed;
  }
}
