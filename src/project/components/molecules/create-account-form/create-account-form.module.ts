import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountFormComponent } from './create-account-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

@NgModule({
  declarations: [CreateAccountFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatProgressSpinnerModule],
  exports: [CreateAccountFormComponent]
})
export class CreateAccountFormModule {}
