import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user-modal',
  template: `
    <div class="wrapper">
      <div class="modal-container">
        <h3>{{ title }}</h3>
        <form [formGroup]="formGroupCtrl" class="modal-input-conatiner">
          <div class="modal-input-wrapper" *ngIf="!!this.isConfirm">
            <label *ngIf="this.isConfirm">Old {{ labelContent }}</label>
            <input formControlName="oldValue" />
          </div>
          <div class="modal-input-wrapper">
            <label *ngIf="this.isConfirm">New {{ labelContent }}</label>
            <label *ngIf="!this.isConfirm">Add New {{ labelContent }}</label>
            <input formControlName="newValue" />
          </div>
          <div class="modal-input-wrapper">
            <label>Confirm {{ labelContent }}</label>
            <input formControlName="confirmValue" />
          </div>
        </form>
        <button (click)="this.handleSaveEmit()">Save</button>
        <button (click)="this.handleCancel.emit(true)">Cancel</button>
      </div>
    </div>
  `,
  styleUrls: ['./update-user-modal.component.scss']
})
export class UpdateUserModalComponent {
  @Input() formGroupCtrl!: FormGroup;
  @Input() isConfirm?: boolean;
  @Input() title!: string;
  @Input() labelContent!: string;
  @Output() handleSave = new EventEmitter<boolean>();
  @Output() handleCancel = new EventEmitter<boolean>();

  handleSaveEmit() {
    console.log('clicks');
    console.log(this.formGroupCtrl.valid);
    this.formGroupCtrl.valid && this.handleSave.emit(true);
  }
}
