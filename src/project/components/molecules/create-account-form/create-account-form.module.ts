import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountFormComponent } from './create-account-form.component';
import { InputFormModule } from '../../atoms/input-form/input-form.module';

@NgModule({
  declarations: [CreateAccountFormComponent],
  imports: [CommonModule, InputFormModule],
  exports: [CreateAccountFormComponent]
})
export class CreateAccountFormModule {}