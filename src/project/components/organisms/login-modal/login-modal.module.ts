import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './login-modal.component';

@NgModule({
  declarations: [LoginModalComponent],
  imports: [CommonModule],
  exports: [LoginModalComponent]
})
export class LoginModalModule {}
