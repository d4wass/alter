import { Component } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  template: `
    <div class="wrapper">
      <h1 class="title">Login to your account</h1>
      <div class="content">
        <div class="inputs">
          <input type="text" placeholder="email" class="input" />
          <input type="password" placeholder="password" class="input" />
        </div>
        <div class="buttons">
          <button class="standard-btn">Confirm</button>
          <button class="cancel-btn">cancel</button>
        </div>
        <div class="divider">
          <span></span>
          <p>Or</p>
          <span></span>
        </div>
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
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  constructor() {}
}
