import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostViewComponent } from './host-view.component';
import { TitleHeaderModule } from 'src/project/components/molecules/title-header/title-header.module';
import { GuideSectionModule } from 'src/project/components/atoms/guide-section/guide-section.module';
import { ResourceSectionModule } from 'src/project/components/molecules/resource-section/resource-section.module';
import { HostPanelSectionModule } from 'src/project/components/molecules/host-panel-section/host-panel-section.module';

@NgModule({
  declarations: [HostViewComponent],
  imports: [
    CommonModule,
    TitleHeaderModule,
    GuideSectionModule,
    ResourceSectionModule,
    HostPanelSectionModule
  ]
})
export class HostViewModule {}
