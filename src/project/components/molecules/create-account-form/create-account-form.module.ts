import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountFormComponent } from './create-account-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CreateAccountFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatProgressSpinnerModule],
  exports: [CreateAccountFormComponent]
})
export class CreateAccountFormModule {}
