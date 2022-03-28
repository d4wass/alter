import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './login-modal.component';
import { LoginModalDirective } from 'src/project/directives/login-modal.directive';

@NgModule({
  declarations: [LoginModalComponent, LoginModalDirective],
  imports: [CommonModule],
  exports: [LoginModalComponent]
})
export class LoginModalModule {}
