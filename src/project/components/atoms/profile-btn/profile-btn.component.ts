import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-btn',
  template: `
    <!-- <ng-container *ngIf="btnType !== 'cancel'">
      <button (click)="handleProfileEdit()">
        <p *ngIf="isEditView">Save Profile</p>
        <p *ngIf="!isEditView">Edit Profile</p>
      </button>
    </ng-container>
    <ng-container *ngIf="btnType === 'cancel' && isEditView">
      <button (click)="handleProfileCancel()">
        <p>Cancel</p>
      </button>
    </ng-container> -->
    <ng-container>
      <button (click)="handleClick()"><ng-content></ng-content></button>
    </ng-container>
  `,
  styleUrls: ['./profile-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBtnComponent {
  @Output() handleClickEvent: EventEmitter<any> = new EventEmitter<any>();

  handleClick() {
    this.handleClickEvent.emit();
  }
}
