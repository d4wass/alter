import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-vehicle-success-create-modal',
  template: `
    <ng-container class="wrapper" *ngIf="isCreated">
      <div class="wrapper-modal">
        <h2>Your Vehicle was successfully created</h2>
        <button (click)="handleCloseBtn()">close</button>
      </div>
    </ng-container>
  `,
  styleUrls: ['./vehicle-success-create-modal.component.scss']
})
export class VehicleSuccessCreateModalComponent {
  @Input() isCreated: boolean = false;
  @Output() handleClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  handleCloseBtn(): void {
    this.handleClick.emit();
  }
}
