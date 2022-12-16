import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormSpecDataComponent } from './vehicle-form-spec-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [VehicleFormSpecDataComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  exports: [VehicleFormSpecDataComponent]
})
export class VehicleFormSpecDataModule {}
