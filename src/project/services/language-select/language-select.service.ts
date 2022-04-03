import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageSelectService {
  selectedOption!: string;
  isOpen!: boolean;

  constructor() {}

  handleOpenSelect(event: string) {
    console.log(event);
  }

  setOption() {}
}
