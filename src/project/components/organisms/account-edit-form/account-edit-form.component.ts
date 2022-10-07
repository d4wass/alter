import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserFacade } from 'src/+state/facade/user.facade';
import { UserDataUpdate } from 'src/+state/models/user.model';
import { UserActions } from 'src/+state/user/user.actions';

@Component({
  selector: 'app-account-edit-form',
  template: `
    <ng-container>
      <ng-container *ngIf="isPasswordModal">
        <app-update-user-modal
          [labelContent]="'Password'"
          [title]="'Change Password'"
          [formGroupCtrl]="passwordForm"
          (handleSave)="handleSave($event)"
          (handleCancel)="handleCancel()"
        ></app-update-user-modal>
      </ng-container>
      <ng-container *ngIf="isMobileModal">
        <app-update-user-modal
          [labelContent]="'mobile number'"
          [title]="'Change Mobile Number'"
          [formGroupCtrl]="mobileForm"
          (handleSave)="handleSave($event)"
          (handleCancel)="handleCancel($event)"
        ></app-update-user-modal>
      </ng-container>

      <h1 class="title">Account</h1>
      <h4>Contact Information</h4>
      <div>
        <span>Email</span>
        <div class="input-wrapper">
          <input class="input" />
          <p>verified</p>
        </div>
      </div>
      <div>
        <h4>Verified info</h4>
        <div class="profile-info-item">
          <p>Approved to drive</p>
          <a href="#">Verify ID</a>
        </div>
      </div>
      <div>
        <h4>Password</h4>
        <button class="standard-btn" id="password-btn" (click)="handleModalVisibility($event)">
          Update
        </button>
      </div>
      <div>
        <h4>Mobile Phone</h4>
        <button class="standard-btn" id="mobile-btn" (click)="handleModalVisibility($event)">
          Update
        </button>
      </div>
      <div>
        <h4>Mobile Notifications</h4>
        <div class="input-wrapper">
          <input type="checkbox" id="mobile" class="checkbox" />
          <label for="mobile">Enable text message notifications</label>
        </div>
      </div>
      <div>
        <h4>Become host</h4>
        <div class="input-wrapper">
          <button class="standard-btn">Update</button>
        </div>
      </div>
      <div>
        <h4>Email Notifications</h4>
        <div class="input-wrapper">
          <input type="checkbox" id="email" class="checkbox" />
          <label for="email">Enable notifications about promotions and announcements</label>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./account-edit-form.component.scss']
})
export class AccountEditFormComponent {
  @Input() userToken: Observable<string> | undefined;
  @Output() passwordUserUpdate = new EventEmitter<any>();
  @Output() mobileUserUpdate = new EventEmitter<any>();
  @Output() userUpdate = new EventEmitter<any>();

  isPasswordModal = false;
  isMobileModal = false;

  passwordForm = new FormGroup({
    newValue: new FormControl('', Validators.compose([Validators.required])),
    oldValue: new FormControl(''),
    confirmValue: new FormControl('')
  });

  mobileForm = new FormGroup({
    newValue: new FormControl(''),
    oldValue: new FormControl(''),
    confirmValue: new FormControl('')
  });

  updateUser: UserDataUpdate = {
    passwordUpdate: {
      newValue: '',
      oldValue: '',
      confirmValue: ''
    },
    mobileUpdate: {
      newValue: '',
      oldValue: '',
      confirmValue: ''
    }
  };

  constructor(private readonly store: Store) {}

  handleModalVisibility(event: Event) {
    const target = event.target as HTMLElement;

    if (target.id === 'password-btn') {
      this.isPasswordModal = !this.isPasswordModal;
    } else if (target.id === 'mobile-btn') {
      this.isMobileModal = !this.isMobileModal;
    }
  }

  handleSave(event: Event) {
    if (this.passwordForm.valid && this.isPasswordModal) {
      //emit form values or pass controls values to parent component where from it we will dispatch action to update
      this.updateUser.passwordUpdate = this.passwordForm.value;
      this.store.dispatch(UserActions.validateUserDataUpdate({ updateUser: this.updateUser }));
    }

    if (this.mobileForm.valid && this.isMobileModal) {
      //emit form values or pass controls values to parent component where from it we will dispatch action to update
      this.updateUser.mobileUpdate = this.mobileForm.value;
      // this.store.dispatch(UserActions.validateUserMobileCredentials(this.mobileForm.value));
    }

    this.userUpdate.emit(this.updateUser);
    this.resetForms();
    //if user click save btn then emit to parent event with data only if all controls are not empty
  }

  handleCancel(event: Event): void {
    console.log('emit from cancel btn: ', event);
    this.resetForms();
  }

  private resetForms(): void {
    this.isPasswordModal = false;
    this.isMobileModal = false;
    this.passwordForm.reset();
    this.mobileForm.reset();
  }
}
