import { Component } from '@angular/core';
import { GuideSectionComponent } from '@project/components/atoms/guide-section/guide-section.component';
import { HostPanelSectionComponent } from '@project/components/molecules/host-panel-section/host-panel-section.component';
import { ResourceSectionComponent } from '@project/components/molecules/resource-section/resource-section.component';
import { TitleHeaderComponent } from '@project/components/molecules/title-header/title-header.component';

@Component({
  standalone: true,
  selector: 'app-host-view',
  templateUrl: './host-view.component.html',
  imports: [
    TitleHeaderComponent,
    GuideSectionComponent,
    ResourceSectionComponent,
    HostPanelSectionComponent
  ],
  styleUrls: ['./host-view.component.scss']
})
export class HostViewComponent {
  constructor() {}
}
