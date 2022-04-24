import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostViewComponent } from './host-view.component';
import { TitleHeaderModule } from 'src/project/components/molecules/title-header/title-header.module';

@NgModule({
  declarations: [HostViewComponent],
  imports: [CommonModule, TitleHeaderModule]
})
export class HostViewModule {}
