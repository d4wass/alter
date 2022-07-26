import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-btn',
  template: `
    <ng-container *ngIf="!isAuthorized">
      <button class="login-btn" (click)="this.isClicked.emit(true)">
        Log in
        <img src="assets/usericon.svg" alt="" />
      </button>
    </ng-container>
    <ng-container *ngIf="isAuthorized">
      <button class="login-btn" [routerLink]="['/', 'profile']">
        <p>{{ userName }}</p>
        <img src="assets/usericon.svg" alt="" />
      </button>
    </ng-container>
  `,
  styleUrls: ['./login-btn.component.scss']
})
export class LoginBtnComponent {
  @Output() isClicked = new EventEmitter<boolean>();
  @Input() isAuthorized!: boolean;
  @Input() userName!: string;
}
