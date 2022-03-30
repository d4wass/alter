import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-header-input',
  template: `
    <div class="search">
      <label for="where" class="search-label" *ngIf="labelValue">{{ labelValue }}</label>
      <input
        type="text"
        id="where"
        placeholder="{{ placeholderValue }}"
        [ngClass]="{ 'search-input': labelValue, 'search-input-noLabel': !labelValue }"
      />
    </div>
  `,
  styleUrls: ['./search-header-input.component.scss']
})
export class SearchHeaderInputComponent {
  @Input() labelValue!: string;
  @Input() placeholderValue!: string;
  @Input() typeValue!: string;
}
