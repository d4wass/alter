import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSearchFormComponent } from './main-search-form.component';
import { SearchHeaderInputComponent } from '../../atoms/search-header-input/search-header-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchHeaderInputModule } from '../../atoms/search-header-input/search-header-input.module';
import { DatepickerModule } from '../datepicker/datepicker.module';

@NgModule({
  declarations: [MainSearchFormComponent],
  imports: [CommonModule, SearchHeaderInputModule, DatepickerModule],
  exports: [MainSearchFormComponent]
})
export class MainSearchFormModule {}
