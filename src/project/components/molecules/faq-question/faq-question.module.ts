import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqButtonComponent } from '../../atoms/faq-button/faq-button.component';
import { FaqTitleComponent } from '../../atoms/faq-title/faq-title.component';
import { FaqQuestionComponent } from './faq-question.component';

@NgModule({
  declarations: [FaqQuestionComponent, FaqButtonComponent, FaqTitleComponent],
  imports: [CommonModule],
  exports: [FaqQuestionComponent]
})
export class FaqQuestionModule {}
