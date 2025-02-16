import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-host-panel-section',
    template: `
    <div class="wrapper">
      <div class="content">
        <h1>Host well, earn big</h1>
        <p>
          Hop to your Host Hub to tweak your settings, monitor your performance, and check in on
          your earnings!
        </p>
        <button class="cta-btn">Go to your Host Hub</button>
      </div>
      <div class="graphic-content"></div>
    </div>
  `,
    styleUrls: ['./host-panel-section.component.scss'],
    standalone: false
})
export class HostPanelSectionComponent {
  constructor() {}
}
