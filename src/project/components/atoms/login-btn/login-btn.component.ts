import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-btn',
  template: `
    <ng-container *ngIf="!isAuthorized; then loginBtn; else userBtn"></ng-container>
    <ng-template #loginBtn>
      <button class="login-btn" (click)="this.isClicked.emit(true)" data-test="login-btn">
        <span data-test="login-btn-text">Log in</span>
        <img src="assets/usericon.svg" alt="" />
      </button>
    </ng-template>
    <ng-template #userBtn>
      <button class="login-btn" [routerLink]="['/', 'profile']" data-test="login-btn">
        <span data-test="login-btn-text">{{ userName }}</span>
        <img src="assets/usericon.svg" alt="" />
      </button>
    </ng-template>
  `,
  styleUrls: ['./login-btn.component.scss']
})
export class LoginBtnComponent {
  @Output() isClicked = new EventEmitter<boolean>();
  @Input() isAuthorized!: boolean;
  @Input() userName?: string;
}
