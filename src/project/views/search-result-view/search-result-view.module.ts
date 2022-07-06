import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultViewComponent } from './search-result-view.component';
import { SearchedCarSectionModule } from 'src/project/components/organisms/searched-car-section/searched-car-section.module';

@NgModule({
  declarations: [SearchResultViewComponent],
  imports: [CommonModule, SearchedCarSectionModule]
})
export class SearchResultViewModule {}
