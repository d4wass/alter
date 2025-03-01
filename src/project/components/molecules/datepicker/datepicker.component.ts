import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD.MM.YYYY'
        },
        display: {
          dateInput: 'MMM DD, YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY'
        }
      }
    }
  ],
  selector: 'app-datepicker',
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input matInput [matDatepicker]="picker1" [formControl]="control" />
      <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
      <mat-datepicker #picker1></mat-datepicker>
    </mat-form-field>
  `,
  styleUrls: ['./datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent {
  @Input() label!: string;
  @Input() parentForm!: any;
  @Input() details!: any;
  @Input() control!: FormControl<any>;
}
