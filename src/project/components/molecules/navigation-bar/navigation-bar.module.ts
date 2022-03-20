import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar.component';
import { NavigationItemComponent } from '../../atoms/navigation-item/navigation-item.component';
import { NavigationItemModule } from '../../atoms/navigation-item/navigation-item.module';

@NgModule({
  declarations: [NavigationBarComponent],
  imports: [CommonModule, NavigationItemModule],
  exports: [NavigationBarComponent]
})
export class NavigationBarModule {}
