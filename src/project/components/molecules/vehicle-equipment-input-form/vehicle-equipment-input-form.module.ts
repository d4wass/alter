import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleEquipmentInputFormComponent } from './vehicle-equipment-input-form.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { VehicleEquipmentItemModule } from '../../atoms/vehicle-equipment-item/vehicle-equipment-item.module';

@NgModule({
  declarations: [VehicleEquipmentInputFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    VehicleEquipmentItemModule
  ],
  exports: [VehicleEquipmentInputFormComponent]
})
export class VehicleEquipmentInputFormModule {}
