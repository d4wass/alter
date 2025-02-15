import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/+state/user/user.actions';

interface IAccount {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  mobile: string;
  isTerms: boolean;
  isNewsletter?: boolean;
}

@Component({
  selector: 'app-create-account-form',
  template: `
    <div>
      <form [formGroup]="form" (ngSubmit)="handleSubmit.emit($event)">
        <div class="personal-info">
          <div class="personal-inputs">
            <input
              placeholder="First name"
              formControlName="firstName"
              [ngClass]="{
                invalid: !this.form.controls.firstName.valid && this.form.controls.firstName.dirty
              }"
            />
            <input
              placeholder="Last name"
              formControlName="lastName"
              [ngClass]="{
                invalid: !this.form.controls.lastName.valid && this.form.controls.lastName.dirty
              }"
            />
          </div>
          <span>Enter your name as it appears on your driver’s license</span>
        </div>
        <div>
          <input
            placeholder="Email"
            formControlName="email"
            [ngClass]="{
              invalid: !this.form.controls.email.valid && this.form.controls.email.dirty
            }"
          />
          <input
            type="password"
            placeholder="Password"
            formControlName="password"
            [ngClass]="{
              invalid: !this.form.controls.password.valid && this.form.controls.password.dirty
            }"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            formControlName="paswordConfirm"
            [ngClass]="{
              invalid:
                !this.form.controls.passwordConfirm.valid &&
                this.form.controls.passwordConfirm.dirty
            }"
          />
          <input
            placeholder="Phone"
            formControlName="mobile"
            [ngClass]="{
              invalid: !this.form.controls.mobile.valid && this.form.controls.mobile.dirty
            }"
          />
        </div>
        <div class="checkbox-terms">
          <div class="checkbox">
            <input type="checkbox" id="terms" name="terms" formControlName="isTerms" />
            <label
              for="terms"
              [ngClass]="{
                unchecked:
                  (this.form.controls.isTerms.invalid$ | async) &&
                  (this.form.controls.isTerms.dirty$ | async)
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
  @Output() handleSubmit = new EventEmitter<any>();
  @Input() form!: FormGroup<ControlsOf<IAccount>>;
  @Input() invalid!: any;
}
