import { Component } from '@angular/core';
import { LanguageSelectService } from 'src/services/language-select/language-select.service';

@Component({
  selector: 'app-language-select',
  template: `
    <div class="wrapper">
      <div class="select">
        <div class="select__label" (click)="handleSelect($event)">Select the category</div>
        <div class="select__option__container">
          <app-language-option
            *ngFor="let item of options"
            [labelValue]="item.value"
            [languageIcon]="item.icon"
          ></app-language-option>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent {
  constructor(private languageSelectService: LanguageSelectService) {}

  options = [
    { value: 'english', icon: 'assets/language/usa.svg' },
    { value: 'polish', icon: 'assets/language/poland.svg' },
    { value: 'german', icon: 'assets/language/germany.svg' },
    { value: 'france', icon: 'assets/language/france.svg' }
  ];

  handleSelect(event: Event) {
    const target = event.target as HTMLElement;

    document.querySelector('.select__label')?.classList.toggle('select__label--open');
    document.querySelector('.select')?.classList.toggle('select__label--open');
    document
      .querySelector('.select__option__container')
      ?.classList.toggle('select__option__container--open');
    document
      .querySelectorAll('.option')
      ?.forEach((item) => item.classList.toggle('select__option__container--open'));
  }
}
