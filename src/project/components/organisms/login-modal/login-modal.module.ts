import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './login-modal.component';
import { CreateAccountFormModule } from '../../molecules/create-account-form/create-account-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModalDirective } from 'src/project/directives/login-modal/login-modal.directive';

@NgModule({
  declarations: [LoginModalComponent, LoginModalDirective],
  imports: [CommonModule, CreateAccountFormModule, ReactiveFormsModule, FormsModule],
  exports: [LoginModalComponent]
})
export class LoginModalModule {}
