import { Component, Input } from '@angular/core';
import { LanguageSelectService } from 'src/project/services/language-select/language-select.service';

@Component({
  selector: 'app-language-option',
  template: `
    <div (click)="handleRadioSelect($event)">
      <div class="option">
        <img src="{{ languageIcon }}" />
        <input type="radio" name="{{ labelValue }}" class="radio" />
        <label for="{{ labelValue }}" class="label">{{ labelValue }}</label>
      </div>
    </div>
  `,
  styleUrls: ['./language-option.component.scss']
})
export class LanguageOptionComponent {
  @Input() labelValue!: string;
  @Input() languageIcon!: string;

  constructor(private languageSelectService: LanguageSelectService) {}

  handleRadioSelect(event: Event) {}
}
