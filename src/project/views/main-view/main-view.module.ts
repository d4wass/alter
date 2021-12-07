import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view-component';
import { NavigationComponent } from 'src/project/components/organisms/navigation/navigation.component';

@NgModule({
  declarations: [MainViewComponent, NavigationComponent],
  imports: [CommonModule]
})
export class MainViewModule {}
