import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchedCarSectionComponent } from '@project/components/organisms/searched-car-section/searched-car-section.component';

@Component({
  standalone: true,
  imports: [CommonModule, SearchedCarSectionComponent],
  selector: 'app-search-result-view',
  templateUrl: './search-result-view.component.html',
  styleUrls: ['./search-result-view.component.scss']
})
export class SearchResultViewComponent {
  constructor() {}
}
