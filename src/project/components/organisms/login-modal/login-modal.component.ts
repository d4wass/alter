import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ModalLoginService } from 'src/project/services/modal-login-service.service';

@Component({
  selector: 'app-login-modal',
  template: `
    <ng-container *ngIf="isVisible">
      <div class="wrapper" appLoginModal>
        <div class="wrapper-modal">
          <h1 class="title">Login to your account</h1>
          <div class="content">
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
      </div>
    </ng-container>
  `,
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  isVisible?: boolean;

  constructor(private modalLoginService: ModalLoginService) {}

  @HostListener('document:keyup.escape', ['$event'])
  onEscape(): void {
    this.modalLoginService.isVisible$.next(false);
  }

  ngOnInit() {
    this.modalLoginService.isVisible$.subscribe((val) => (this.isVisible = val));
  }

  onCancel() {
    this.modalLoginService.isVisible$.next(false);
  }
}
