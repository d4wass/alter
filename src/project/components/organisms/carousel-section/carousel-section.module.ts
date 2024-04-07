import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselSectionComponent } from './carousel-section.component';
import { CarCardComponent } from '../../molecules/car-card/car-card.component';
import { CarouselAnimationDirective } from '../../../directives/carousel-animation/carousel-animation.directive';

@NgModule({
  declarations: [CarouselSectionComponent, CarCardComponent],
  imports: [CommonModule, CarouselAnimationDirective],
  exports: [CarouselSectionComponent]
})
export class CarouselSectionModule {}
