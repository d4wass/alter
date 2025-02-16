import { Component, OnInit } from '@angular/core';
import { ModalLoginService } from '../../../../services/modal-login/modal-login-service.service';
import { FormControl, FormGroup, ValuesOf } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/+state/user/user.actions';
import { AppActions } from 'src/+state/app-state/app-state.actions';
import { filter, map, Observable, tap, withLatestFrom } from 'rxjs';

@Component({
    selector: 'app-login-modal',
    template: `
    <ng-container *ngIf="isVisible$ | async">
      <div class="wrapper" appLoginModal>
        <div class="wrapper-modal" appLoginModal>
          <h1 class="title" *ngIf="isLoginView$ | async">Login to your account</h1>
          <h1 class="title" *ngIf="!(isLoginView$ | async)">Create an account</h1>
          <div class="content">
            <ng-container *ngIf="isLoginView$ | async">
              <form [formGroup]="loginForm" (submit)="handleLogin($event)">
                <div class="inputs">
                  <input
                    placeholder="email"
                    formControlName="email"
                    [ngClass]="{ invalid: (emailValid$ | async) }"
                  />
                  <input
                    type="password"
                    placeholder="password"
                    formControlName="password"
                    [ngClass]="{ invalid: (passwordValid$ | async) }"
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
            <ng-container *ngIf="(isEmailView$ | async) && !(isLoginView$ | async)">
              <app-create-account-form
                [form]="createAccountForm"
                (handleSubmit)="handleCreateUser($event)"
              ></app-create-account-form>
            </ng-container>
            <ng-container *ngIf="!(isEmailView$ | async) || (isLoginView$ | async)">
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
                <button
                  class="social-btn"
                  *ngIf="!(isLoginView$ | async)"
                  (click)="setCreateAccountView(true)"
                >
                  <img src="assets/envelope.svg" />
                  <p>Continue with Email</p>
                </button>
              </div>
            </ng-container>
            <div class="divider">
              <span></span>
            </div>
            <ng-container *ngIf="!(isLoginView$ | async)">
              <div class="change-btn">
                <p>Already have an account?</p>
                <button (click)="setStateModalView($event)" id="login">Log in</button>
              </div>
            </ng-container>
            <ng-container *ngIf="isLoginView$ | async">
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
    styleUrls: ['./login-modal.component.scss'],
    standalone: false
})
export class LoginModalComponent implements OnInit {
  isVisible$?: Observable<boolean>;
  isLoginView$?: Observable<boolean>;
  isEmailView$?: Observable<boolean>;
  emailValid$?: Observable<boolean>;
  passwordValid$?: Observable<boolean>;
  createAccountFormValidStatus$?: Observable<any>;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  createAccountForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    mobile: new FormControl('', [Validators.required, Validators.maxLength(11)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
    isTerms: new FormControl(false, [Validators.required, Validators.requiredTrue]),
    isNewsletter: new FormControl(false)
  });

  constructor(private modalLoginService: ModalLoginService, private readonly store: Store) {}

  ngOnInit() {
    this.isVisible$ = this.modalLoginService.isVisible$;
    this.isLoginView$ = this.modalLoginService.isLoginView$;
    this.isEmailView$ = this.modalLoginService.isEmailView$;

    const { email, password } = this.loginForm.controls;
    this.emailValid$ = this.formControlValidStatus(email);
    this.passwordValid$ = this.formControlValidStatus(password);

    // this.createAccountFormValidStatus$ = Object.fromEntries(
    //   Object.entries(this.createAccountForm.controls).map(([key, control]) => [key, control.value])
    // );
    console.log(
      Object.values(this.createAccountForm.controls),
      Object.entries(this.createAccountForm.controls),
      Object.fromEntries(
        Object.entries(this.createAccountForm.controls).map(([key, control]) => [key, control])
      )
    );
  }

  handleLogin(): void {
    this.formValueHandler(this.loginForm).subscribe(({ values }) => {
      const { email, password } = values;
      this.store.dispatch(UserActions.login({ email, password }));
    });
  }

  onCancel() {
    this.store.dispatch(AppActions.closeModal({ isLoginModalOpen: false }));
  }

  handleCreateUser(event: Event) {
    event.preventDefault();
    this.formValueHandler(this.createAccountForm)
      .pipe(tap((x) => console.log(x)))
      .subscribe(({ values }) => this.store.dispatch(UserActions.createUser({ user: values })));
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

  private formValueHandler<T extends Record<string, any>>(
    formGroup: FormGroup<T>
  ): Observable<{ values: ValuesOf<T>; valid: boolean }> {
    return formGroup.value$.pipe(
      withLatestFrom(formGroup.valid$),
      map(([values, valid]) => ({ values, valid })),
      filter(({ valid }) => !!valid)
    );
  }

  private formControlValidStatus<T>(control: FormControl<T>): Observable<boolean> {
    return control.valid$.pipe(
      withLatestFrom(control.dirty$),
      tap((x) => console.log(x)),
      map(([valid, dirty]) => !valid && dirty)
    );
  }
}
