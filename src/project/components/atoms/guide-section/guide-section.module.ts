import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideSectionComponent } from './guide-section.component';
import { GuideItemComponent } from '../guide-item/guide-item.component';

@NgModule({
  declarations: [GuideSectionComponent, GuideItemComponent],
  imports: [CommonModule],
  exports: [GuideSectionComponent]
})
export class GuideSectionModule {}
