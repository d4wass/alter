import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselSectionComponent } from './carousel-section.component';
import { CarCardComponent } from '../../molecules/car-card/car-card.component';
import { CarouselAnimationDirective } from '../../../directives/carousel-animation/carousel-animation.directive';
import { ReviewCardComponent } from '../../molecules/customer-card/customer-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CarouselSectionComponent,
    CarCardComponent,
    ReviewCardComponent,
    CarouselAnimationDirective
  ],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [CarouselSectionComponent]
})
export class CarouselSectionModule {}
