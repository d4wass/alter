import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalLoginService } from 'src/project/services/modal-login-service.service';

@Component({
  selector: 'app-login-modal',
  template: `
    <ng-container *ngIf="isVisible">
      <div class="wrapper" appLoginModal>
        <div class="wrapper-modal" appLoginModal>
          <h1 class="title" *ngIf="isLogin">Login to your account</h1>
          <h1 class="title" *ngIf="!isLogin">Create an account</h1>
          <div class="content">
            <ng-container *ngIf="isLogin">
              <div class="inputs">
                <input type="text" placeholder="email" class="input" />
                <input type="password" placeholder="password" class="input" />
              </div>
              <div class="buttons">
                <button class="standard-btn">Confirm</button>
                <button class="cancel-btn" (click)="onCancel()">cancel</button>
              </div>
              <div class="divider">
                <span></span>
                <p>Or</p>
                <span></span>
              </div>
            </ng-container>
            <div class="buttons">
              <button class="social-btn">
                <img src="assets/facebook.svg" />
                <p>Continue with Facebook</p>
              </button>
              <button class="social-btn">
                <img src="assets/google.svg" />
                <p>Continue with Google</p>
              </button>
              <button class="social-btn">
                <img src="assets/apple.svg" />
                <p>Continue with Apple</p>
              </button>
              <button class="social-btn">
                <img src="assets/envelope.svg" />
                <p>Continue with Email</p>
              </button>
            </div>
            <div class="divider">
              <span></span>
            </div>
            <ng-container *ngIf="!isLogin">
              <div class="change-btn">
                <p>Already have an account?</p>
                <button (click)="setStateModalView($event)" id="login">Log in</button>
              </div>
            </ng-container>
            <ng-container *ngIf="isLogin">
              <div class="change-btn">
                <p>Don't have an account?</p>
                <button (click)="setStateModalView($event)" id="signup">Sign up</button>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {
  isVisible?: boolean;
  isLogin?: boolean;

  constructor(private modalLoginService: ModalLoginService) {}

  ngOnInit() {
    this.modalLoginService.isVisible$.subscribe((isVisible) => (this.isVisible = isVisible));
    this.modalLoginService.isLogin$.subscribe((isLogin) => (this.isLogin = isLogin));
  }

  ngOnDestroy(): void {
    this.modalLoginService.isVisible$.unsubscribe();
    this.modalLoginService.isLogin$.unsubscribe();
  }

  onCancel() {
    this.modalLoginService.isVisible$.next(false);
  }

  setStateModalView(event: Event) {
    let target = event.target as HTMLElement;

    if (target.id === 'login') {
      this.modalLoginService.isLogin$.next(true);
    }

    if (target.id === 'signup') {
      this.modalLoginService.isLogin$.next(false);
    }
  }
}
