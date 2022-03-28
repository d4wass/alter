import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { NavigationBarModule } from '../../molecules/navigation-bar/navigation-bar.module';
import { LoginBtnComponent } from '../../atoms/login-btn/login-btn.component';

@NgModule({
  declarations: [NavigationComponent, LoginBtnComponent],
  imports: [CommonModule, RouterModule, NavigationBarModule],
  exports: [NavigationComponent]
})
export class NavigationModule {}
