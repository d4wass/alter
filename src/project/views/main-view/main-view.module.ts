import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view-component';
import { LoginModalModule } from 'src/project/components/organisms/login-modal/login-modal.module';

@NgModule({
  declarations: [MainViewComponent],
  imports: [CommonModule, LoginModalModule]
})
export class MainViewModule {}
