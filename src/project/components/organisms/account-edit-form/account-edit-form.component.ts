import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { FormControl } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import {
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  pairwise,
  startWith,
  tap,
  withLatestFrom
} from 'rxjs';
import { UserFacade } from 'src/+state/facade/user.facade';
import { UserActions } from 'src/+state/user/user.actions';

@Component({
  selector: 'app-account-edit-form',
  template: `
    <ng-container>
      <ng-container *ngIf="isPasswordModal">
        <app-update-user-modal
          [labelContent]="'Password'"
          [title]="'Change Password'"
          [isConfirm]="isPasswordModal"
          [formGroupCtrl]="passwordForm"
          (handleSave)="handleSave($event)"
          (handleCancel)="handleCancel()"
        ></app-update-user-modal>
      </ng-container>
      <ng-container *ngIf="isMobileModal">
        <app-update-user-modal
          [labelContent]="'mobile number'"
          [title]="'Change Mobile Number'"
          [isConfirm]="!!(isMobileConfirm$ | async)"
          [formGroupCtrl]="mobileForm"
          (handleSave)="handleSave($event)"
          (handleCancel)="handleCancel()"
        ></app-update-user-modal>
      </ng-container>

      <h1 class="title">Account</h1>
      <h4>Contact Information</h4>
      <div>
        <span>Email</span>
        <div class="input-wrapper">
          <input class="input" [formControl]="emailCtrl" (keydown)="handleEmailEmit()" />
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
  @Output() userUpdate = new EventEmitter<any>();
  @Output() emailUpdate = new EventEmitter<string>();

  isMobileConfirm$: Observable<string | undefined> = this.userFacade.userMobile$;
  isPasswordModal = false;
  isMobileModal = false;

  emailCtrl = new FormControl('', {
    validators: Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
  });
  passwordForm = new FormGroup(
    {
      newValue: new FormControl(''),
      oldValue: new FormControl(''),
      confirmValue: new FormControl('')
    },
    {
      validators: [
        this.controlEqualityValidator('password'),
        Validators.required,
        Validators.minLength(8)
      ]
    }
  );

  mobileForm = new FormGroup(
    {
      newValue: new FormControl('', Validators.required),
      oldValue: new FormControl(''),
      confirmValue: new FormControl('', Validators.required)
    },
    {
      validators: [
        this.controlEqualityValidator('mobile'),
        Validators.minLength(6),
        Validators.maxLength(12)
      ]
    }
  );

  emailUserUpdate: string = '';
  updateUser: any = {
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

  constructor(private readonly store: Store, private readonly userFacade: UserFacade) {}

  handleModalVisibility(event: Event) {
    const target = event.target as HTMLElement;

    if (target.id === 'password-btn') {
      this.isPasswordModal = !this.isPasswordModal;
    } else if (target.id === 'mobile-btn') {
      this.isMobileModal = !this.isMobileModal;
    }
  }

  handleSave(event: Event): void {
    if (event) {
      if (this.passwordForm.valid && this.isPasswordModal) {
        this.updateUser = { ...this.updateUser, passwordUpdate: { ...this.passwordForm.value } };
      }

      if (this.mobileForm.valid && this.isMobileModal) {
        this.updateUser = { ...this.updateUser, mobileUpdate: { ...this.mobileForm.value } };
      }
      this.store.dispatch(UserActions.validateUserDataUpdate({ updateUser: this.updateUser }));
      this.resetForms();
    }
    this.userUpdate.emit(this.updateUser);
  }

  handleCancel(): void {
    this.resetForms();
  }

  handleEmailEmit() {
    if (this.emailCtrl.valid && this.emailCtrl.value !== '') {
      this.emailCtrl.valueChanges
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe((value) => {
          this.emailUpdate.emit(value);
        });
    }
  }

  private resetForms(): void {
    this.isPasswordModal = false;
    this.isMobileModal = false;
    this.passwordForm.reset();
    this.mobileForm.reset();
  }

  private controlEqualityValidator(type?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const { oldValue, newValue, confirmValue } = formGroup.value;
      // make from string to enum
      if (type === 'password') {
        return newValue === confirmValue && oldValue !== newValue && oldValue !== confirmValue
          ? null
          : { valuesDoNotMatch: true };
      } else if (type === 'mobile') {
        if (newValue === confirmValue || (oldValue !== newValue && newValue === confirmValue)) {
          return null;
        } else {
          return { valuesDoNotMatch: true };
        }
      } else {
        return null;
      }
    };
  }
}
