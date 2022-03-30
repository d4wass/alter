import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchHeaderComponent } from './search-header.component';
import { SearchHeaderInputComponent } from '../../atoms/search-header-input/search-header-input.component';

@NgModule({
  declarations: [SearchHeaderComponent, SearchHeaderInputComponent],
  imports: [CommonModule],
  exports: [SearchHeaderComponent]
})
export class SearchHeaderModule {}
