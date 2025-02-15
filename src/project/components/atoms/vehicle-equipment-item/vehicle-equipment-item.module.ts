import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleEquipmentItemComponent } from './vehicle-equipment-item.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [VehicleEquipmentItemComponent],
  imports: [CommonModule, MatListModule, MatIconModule],
  exports: [VehicleEquipmentItemComponent]
})
export class VehicleEquipmentItemModule {}
