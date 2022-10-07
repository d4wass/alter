import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/+state/user/user.actions';

interface IAccount {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isTerms: boolean;
  isNewsletter?: boolean;
}

@Component({
  selector: 'app-create-account-form',
  template: `
    <div>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="personal-info">
          <div class="personal-inputs">
            <input
              placeholder="First name"
              formControlName="firstName"
              [ngClass]="{
                invalid: !this.controls.firstName.valid && this.controls.firstName.dirty
              }"
            />
            <input
              placeholder="Last name"
              formControlName="lastName"
              [ngClass]="{ invalid: !this.controls.lastName.valid && this.controls.lastName.dirty }"
            />
          </div>
          <span>Enter your name as it appears on your driver’s license</span>
        </div>
        <div>
          <input
            placeholder="Email"
            formControlName="email"
            [ngClass]="{ invalid: !this.controls.email.valid && this.controls.email.dirty }"
          />
          <input
            type="password"
            placeholder="Password"
            formControlName="password"
            [ngClass]="{ invalid: !this.controls.password.valid && this.controls.password.dirty }"
          />
        </div>
        <div class="checkbox-terms">
          <div class="checkbox">
            <input type="checkbox" id="terms" name="terms" formControlName="isTerms" />
            <label
              for="terms"
              [ngClass]="{
                unchecked:
                  (this.controls.isTerms.invalid$ | async) && (this.controls.isTerms.dirty$ | async)
              }"
              >I agree to the terms of service and privacy policy.</label
            >
          </div>
          <div class="checkbox">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              formControlName="isNewsletter"
            />
            <label for="newsletter">Yes, send me deals, discounts, and updates!</label>
          </div>
        </div>
        <div>
          <button class="signup-btn" type="submit">Sign up</button>
        </div>
      </form>
      <!-- <mat-progress-spinner mode="indeterminate"></mat-progress-spinner> -->
    </div>
  `,
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  form = new FormGroup<ControlsOf<IAccount>>({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    isTerms: new FormControl(false, [Validators.required, Validators.requiredTrue]),
    isNewsletter: new FormControl(false)
  });
  controls = this.form.controls;

  constructor(private store: Store) {}

  onSubmit() {
    const { firstName, lastName, email, password } = this.form.controls;
    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    };
    this.store.dispatch(UserActions.createUser({ user }));
  }
}
