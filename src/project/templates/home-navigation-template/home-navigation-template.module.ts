import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavigationTemplateComponent } from './home-navigation-template.component';
import { NavigationBarComponent } from 'src/project/components/organisms/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [HomeNavigationTemplateComponent, NavigationBarComponent],
  imports: [CommonModule],
  bootstrap: [HomeNavigationTemplateComponent]
})
export class HomeNavigationTemplateModule {}
