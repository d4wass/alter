import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowWorksSectionComponent } from './how-works-section.component';
import { HowWorkItemModule } from '../../atoms/how-work-item/how-work-item.module';

@NgModule({
  declarations: [HowWorksSectionComponent],
  imports: [CommonModule, HowWorkItemModule],
  exports: [HowWorksSectionComponent]
})
export class HowWorksSectionModule {}
