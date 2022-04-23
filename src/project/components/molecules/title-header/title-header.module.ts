import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from './title-header.component';
import { MainSearchFormModule } from '../main-search-form/main-search-form.module';

@NgModule({
  declarations: [TitleHeaderComponent],
  imports: [CommonModule, MainSearchFormModule],
  exports: [TitleHeaderComponent]
})
export class TitleHeaderModule {}
