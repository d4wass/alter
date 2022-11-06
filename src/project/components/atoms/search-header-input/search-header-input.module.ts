import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchHeaderInputComponent } from './search-header-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchHeaderInputComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [SearchHeaderInputComponent]
})
export class SearchHeaderInputModule {}
