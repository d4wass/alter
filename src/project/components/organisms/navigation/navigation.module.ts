import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { NavigationBarModule } from '../../molecules/navigation-bar/navigation-bar.module';
import { LoginBtnModule } from '../../atoms/login-btn/login-btn.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule, NavigationBarModule, LoginBtnModule],
  exports: [NavigationComponent]
})
export class NavigationModule {}
