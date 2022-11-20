import { Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
@Component({
  selector: 'app-search-header-input',
  template: `
    <form class="search">
      <label for="where" class="search-label" *ngIf="labelValue">{{ labelValue }}</label>
      <input
        type="{{ typeValue }}"
        id="where"
        placeholder="{{ placeholderValue }}"
        [ngClass]="{ 'search-input': labelValue, 'search-input-noLabel': !labelValue }"
        [formControl]="control"
      />
    </form>
  `,
  styleUrls: ['./search-header-input.component.scss']
})
export class SearchHeaderInputComponent {
  @Input() labelValue!: string;
  @Input() placeholderValue!: string;
  @Input() typeValue: string = 'text';
  @Input() control!: FormControl<string | unknown>;
}
