import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselSectionComponent } from './carousel-section.component';
import { CarCardComponent } from '../../molecules/car-card/car-card.component';

@NgModule({
  declarations: [CarouselSectionComponent, CarCardComponent],
  imports: [CommonModule],
  exports: [CarouselSectionComponent]
})
export class CarouselSectionModule {}
