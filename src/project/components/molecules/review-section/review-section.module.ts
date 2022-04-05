import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewSectionComponent } from './review-section.component';
import { ReviewCardComponent } from '../customer-card/customer-card.component';

@NgModule({
  declarations: [ReviewSectionComponent, ReviewCardComponent],
  imports: [CommonModule],
  exports: [ReviewSectionComponent]
})
export class ReviewSectionModule {}
