import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitSectionComponent } from './benefit-section.component';
import { HowWorkItemModule } from '../../atoms/how-work-item/how-work-item.module';

@NgModule({
  declarations: [BenefitSectionComponent],
  imports: [CommonModule, HowWorkItemModule],
  exports: [BenefitSectionComponent]
})
export class BenefitSectionModule {}
