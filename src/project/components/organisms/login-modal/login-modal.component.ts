import { Component, OnInit } from '@angular/core';
import { ModalLoginService } from '../../../services/modal-login/modal-login-service.service';
import { FormControl } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/+state/user/user.actions';
import { AppActions } from 'src/+state/app-state/app-state.actions';

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
              <form (submit)="onLogin($event)">
                <div class="inputs">
                  <input
                    placeholder="email"
                    [formControl]="emailCtrl"
                    [ngClass]="{ invalid: (isEmailCtrlValid | async) }"
                  />
                  <input
                    type="password"
                    placeholder="password"
                    [formControl]="passwordCtrl"
                    [ngClass]="{ invalid: (isPasswordCtrlValid | async) }"
                  />
                </div>
                <div class="buttons">
                  <button class="standard-btn" type="submit">Confirm</button>
                  <button class="cancel-btn" (click)="onCancel()">cancel</button>
                </div>
              </form>
              <div class="divider">
                <span></span>
                <p>Or</p>
                <span></span>
              </div>
            </ng-container>
            <ng-container *ngIf="isEmail && !isLogin">
              <app-create-account-form></app-create-account-form>
            </ng-container>
            <ng-container *ngIf="!isEmail || isLogin">
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
                <button class="social-btn" *ngIf="!isLogin" (click)="setCreateAccountView(true)">
                  <img src="assets/envelope.svg" />
                  <p>Continue with Email</p>
                </button>
              </div>
            </ng-container>
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
export class LoginModalComponent implements OnInit {
  isVisible?: boolean;
  isLogin?: boolean;
  isEmail?: boolean;

  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  isEmailCtrlValid = this.emailCtrl.valid$;
  isPasswordCtrlValid = this.passwordCtrl.valid$;

  constructor(private modalLoginService: ModalLoginService, private readonly store: Store) {}

  ngOnInit() {
    this.modalLoginService.isVisible$.subscribe((isVisible) => (this.isVisible = isVisible));
    this.modalLoginService.isLogin$.subscribe((isLogin) => (this.isLogin = isLogin));
    this.modalLoginService.isEmailView$.subscribe((isEmail) => (this.isEmail = isEmail));
  }

  onLogin(): void {
    let emailValid;
    let passwordValid;
    this.isEmailCtrlValid.subscribe((value) => (emailValid = value));
    this.isPasswordCtrlValid.subscribe((value) => (passwordValid = value));

    if (emailValid && passwordValid) {
      this.store.dispatch(
        UserActions.login({ email: this.emailCtrl.value, password: this.passwordCtrl.value })
      );
    }
  }

  onCancel() {
    this.store.dispatch(AppActions.closeModal({ isLoginModalOpen: false }));
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.emailCtrl.valid && this.passwordCtrl.valid) {
    }
  }

  setStateModalView(event: Event) {
    let target = event.target as HTMLElement;

    if (target.id === 'login') {
      this.store.dispatch(AppActions.setLoginModalToLoginView({ isLogin: true }));
    }

    if (target.id === 'signup') {
      this.store.dispatch(AppActions.setLoginModalToSignUpView({ isSignUp: false }));
    }
  }

  setCreateAccountView(isEmail: boolean) {
    this.store.dispatch(AppActions.setLoginModalToSingUpEmailView({ isEmail }));
  }
}
