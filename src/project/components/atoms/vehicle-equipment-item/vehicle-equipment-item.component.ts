import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  imports: [MatListModule, MatIconModule],
  selector: 'app-vehicle-equipment-item',
  template: `
    <mat-list-item class="equipment-item">
      <div matListItemTitle data-test="title">{{ equipment }}</div>
      <button (click)="closeClick($event)" class="remove-btn" data-test="remove-btn">
        <mat-icon matListItemIcon>close</mat-icon>
      </button>
    </mat-list-item>
  `,
  styleUrls: ['./vehicle-equipment-item.component.scss']
})
export class VehicleEquipmentItemComponent {
  @Input() equipment!: string;
  @Output() handleClose: EventEmitter<any> = new EventEmitter();

  closeClick(e: Event): void {
    this.handleClose.emit(e);
  }
}
