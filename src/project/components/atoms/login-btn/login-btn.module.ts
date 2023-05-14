import { NgModule } from '@angular/core';
import { LoginBtnComponent } from './login-btn.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginBtnComponent],
  imports: [RouterModule, CommonModule],
  exports: [LoginBtnComponent]
})
export class LoginBtnModule {}
