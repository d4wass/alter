import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqSectionComponent } from './faq-section.component';
import { FaqQuestionModule } from '../../molecules/faq-question/faq-question.module';

@NgModule({
  declarations: [FaqSectionComponent],
  imports: [CommonModule, FaqQuestionModule],
  exports: [FaqSectionComponent]
})
export class FaqSectionModule {}
