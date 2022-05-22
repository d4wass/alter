import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountFormComponent } from './create-account-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateAccountFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CreateAccountFormComponent]
})
export class CreateAccountFormModule {}
