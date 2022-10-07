import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user-modal',
  template: `
    <div class="wrapper">
      <div class="modal-container">
        <h3>{{ title }}</h3>
        <form [formGroup]="formGroupCtrl" class="modal-input-conatiner">
          <div class="modal-input-wrapper">
            <label>Old {{ labelContent }}</label>
            <input id="old-password" formControlName="oldValue" />
          </div>
          <div class="modal-input-wrapper">
            <label>New {{ labelContent }}</label>
            <input id="new-password" formControlName="newValue" />
          </div>
          <div class="modal-input-wrapper">
            <label>Confirm {{ labelContent }}</label>
            <input id="new-password-confirm" formControlName="confirmValue" />
          </div>
        </form>
        <button (click)="this.handleSave.emit(true)">Save</button>
        <button (click)="this.handleCancel.emit(true)">Cancel</button>
      </div>
    </div>
  `,
  styleUrls: ['./update-user-modal.component.scss']
})
export class UpdateUserModalComponent {
  @Input() formGroupCtrl!: FormGroup;
  @Input() title!: string;
  @Input() labelContent!: string;
  @Output() handleSave = new EventEmitter<boolean>();
  @Output() handleCancel = new EventEmitter<boolean>();
}
