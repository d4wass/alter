import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleFormMainDataModule } from '../../molecules/vehicle-form-main-data/vehicle-form-main-data.module';
import { VehicleFormSpecDataModule } from '../../molecules/vehicle-form-spec-data/vehicle-form-spec-data.module';
import { VehicleFormFeaturesDataModule } from '../../molecules/vehicle-form-features-data/vehicle-form-features-data.module';
import { VehicleSuccessCreateModalComponent } from '../../molecules/vehicle-success-create-modal/vehicle-success-create-modal.component';

@NgModule({
  declarations: [VehicleFormComponent, VehicleSuccessCreateModalComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    VehicleFormMainDataModule,
    VehicleFormSpecDataModule,
    VehicleFormFeaturesDataModule,
    ReactiveFormsModule
  ],
  exports: [VehicleFormComponent]
})
export class VehicleFormModule {}
