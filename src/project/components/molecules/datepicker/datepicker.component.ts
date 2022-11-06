import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

@Component({
  selector: 'app-datepicker',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>{{ label }}</mat-label>
      <input matInput [matDatepicker]="picker1" [formControl]="control" />
      <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
      <mat-datepicker #picker1></mat-datepicker>
    </mat-form-field>
  `,
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
  @Input() label!: string;
  @Input() parentForm!: any;
  @Input() details!: any;
  @Input() control!: FormControl<any>;
}
