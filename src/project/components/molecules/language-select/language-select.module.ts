import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectComponent } from './language-select.component';
import { LanguageOptionComponent } from '../../atoms/language-option/language-option.component';

@NgModule({
  declarations: [LanguageSelectComponent, LanguageOptionComponent],
  imports: [CommonModule],
  exports: [LanguageSelectComponent]
})
export class LanguageSelectModule {}
