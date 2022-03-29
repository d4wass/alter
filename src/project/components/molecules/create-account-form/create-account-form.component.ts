import { Component } from '@angular/core';

@Component({
  selector: 'app-create-account-form',
  template: `
    <div>
      <div class="personal-info">
        <div class="personal-inputs">
          <app-input-form placeholder="First name" [className]="className"></app-input-form>
          <app-input-form placeholder="Last name" [className]="className"></app-input-form>
        </div>
        <span>Enter your name as it appears on your driver’s license</span>
      </div>
      <div>
        <app-input-form placeholder="Email"></app-input-form>
        <app-input-form placeholder="Password"></app-input-form>
      </div>
      <div class="checkbox-terms">
        <div class="checkbox">
          <input type="checkbox" id="terms" name="terms" checked />
          <label for="terms">I agree to the terms of service and privacy policy.</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="newsletter" name="newsletter" checked />
          <label for="newsletter">Yes, send me deals, discounts, and updates!</label>
        </div>
      </div>
      <div>
        <button class="signup-btn">Sign up</button>
      </div>
    </div>
  `,
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  className = 'personal';
  constructor() {}
}
