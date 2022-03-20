import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItemComponent } from './navigation-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavigationItemComponent]
})
export class NavigationItemModule {}
