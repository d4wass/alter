import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './login-modal.component';
import { LoginModalDirective } from 'src/project/directives/login-modal.directive';
import { InputFormModule } from '../../atoms/input-form/input-form.module';
import { CreateAccountFormModule } from '../../molecules/create-account-form/create-account-form.module';

@NgModule({
  declarations: [LoginModalComponent, LoginModalDirective],
  imports: [CommonModule, InputFormModule, CreateAccountFormModule],
  exports: [LoginModalComponent]
})
export class LoginModalModule {}
