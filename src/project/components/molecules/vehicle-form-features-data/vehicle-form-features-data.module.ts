import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormFeaturesDataComponent } from './vehicle-form-features-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleFeatureCheckboxInputFormModule } from '../../atoms/vehicle-feature-checkbox-input-form/vehicle-feature-checkbox-input-form.module';
import { VehicleFeatureRadioInputFormModule } from '../../atoms/vehicle-feature-radio-input-form/vehicle-feature-radio-input-form.module';

@NgModule({
  declarations: [VehicleFormFeaturesDataComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    VehicleFeatureCheckboxInputFormModule,
    VehicleFeatureRadioInputFormModule
  ],
  exports: [VehicleFormFeaturesDataComponent]
})
export class VehicleFormFeaturesDataModule {}
