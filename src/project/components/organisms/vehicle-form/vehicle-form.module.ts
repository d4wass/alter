import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleFormMainDataModule } from '../../molecules/vehicle-form-main-data/vehicle-form-main-data.module';
import { VehicleFormSpecDataModule } from '../../molecules/vehicle-form-spec-data/vehicle-form-spec-data.module';
import { VehicleFormFeaturesDataModule } from '../../molecules/vehicle-form-features-data/vehicle-form-features-data.module';
import { VehicleSuccessCreateModalComponent } from '../../molecules/vehicle-success-create-modal/vehicle-success-create-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

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
