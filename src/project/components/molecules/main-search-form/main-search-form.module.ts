import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSearchFormComponent } from './main-search-form.component';
import { SearchHeaderInputComponent } from '../../atoms/search-header-input/search-header-input.component';

@NgModule({
  declarations: [MainSearchFormComponent, SearchHeaderInputComponent],
  imports: [CommonModule],
  exports: [MainSearchFormComponent]
})
export class MainSearchFormModule {}
