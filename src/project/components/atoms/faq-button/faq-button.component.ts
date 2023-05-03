import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-faq-button',
  template: `
    <button (click)="handleOpen()" data-test="btn">
      <img src="assets/faq/minus-solid.svg" alt="" *ngIf="isOpen" />
      <img src="assets/faq/plus-solid.svg" alt="" *ngIf="!isOpen" />
    </button>
  `,
  styleUrls: ['./faq-button.component.scss']
})
export class FaqButtonComponent {
  isOpen: boolean = false;
  @Output() isOpenEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleOpen() {
    this.isOpenEvent.emit(!this.isOpen);
    this.isOpen = !this.isOpen;
  }
}
