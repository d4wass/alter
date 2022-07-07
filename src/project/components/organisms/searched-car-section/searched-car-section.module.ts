import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchedCarSectionComponent } from './searched-car-section.component';
import { SearchedCarCardComponent } from '../../molecules/searched-car-card/searched-car-card.component';

@NgModule({
  declarations: [SearchedCarSectionComponent, SearchedCarCardComponent],
  imports: [CommonModule],
  exports: [SearchedCarSectionComponent]
})
export class SearchedCarSectionModule {}
