import { Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'app-datepicker',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Angular forms</mat-label>
      <input matInput [matDatepicker]="picker1" [formControl]="control" />
      <mat-hint>MM/DD/YYYY</mat-hint>
      <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
      <mat-datepicker #picker1></mat-datepicker>
    </mat-form-field>
  `,
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
  @Input() control!: FormControl<string | unknown>;
  constructor() {}
}
