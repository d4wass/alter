import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [DatepickerComponent],
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, ReactiveFormsModule],
  exports: [DatepickerComponent]
})
export class DatepickerModule {}
