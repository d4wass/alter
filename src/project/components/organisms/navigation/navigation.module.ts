import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from '../../molecules/navigation-bar/navigation-bar.component';
import { NavigationComponent } from './navigation.component';

@NgModule({
  declarations: [NavigationComponent, NavigationBarComponent],
  imports: [CommonModule],
  exports: [NavigationComponent]
})
export class NavigationModule {}
