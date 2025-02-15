import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormFeaturesDataComponent } from './vehicle-form-features-data.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleFeatureRadioInputFormModule } from '../../atoms/vehicle-feature-radio-input-form/vehicle-feature-radio-input-form.module';
import { VehicleEquipmentInputFormModule } from '../vehicle-equipment-input-form/vehicle-equipment-input-form.module';

@NgModule({
  declarations: [VehicleFormFeaturesDataComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    VehicleEquipmentInputFormModule,
    VehicleFeatureRadioInputFormModule
  ],
  exports: [VehicleFormFeaturesDataComponent]
})
export class VehicleFormFeaturesDataModule {}
