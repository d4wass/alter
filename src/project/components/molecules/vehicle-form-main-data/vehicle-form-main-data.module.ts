import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormMainDataComponent } from './vehicle-form-main-data.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

@NgModule({
  declarations: [VehicleFormMainDataComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  exports: [VehicleFormMainDataComponent]
})
export class VehicleFormMainDataModule {}
