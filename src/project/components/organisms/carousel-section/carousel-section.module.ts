import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselSectionComponent } from './carousel-section.component';
import { CarCardComponent } from '../../molecules/car-card/car-card.component';
import { CarouselAnimationDirective } from '../../../directives/carousel-animation/carousel-animation.directive';
import { ReviewCardComponent } from '../../molecules/customer-card/customer-card.component';

@NgModule({
  declarations: [
    CarouselSectionComponent,
    CarCardComponent,
    ReviewCardComponent,
    CarouselAnimationDirective
  ],
  imports: [CommonModule],
  exports: [CarouselSectionComponent]
})
export class CarouselSectionModule {}
