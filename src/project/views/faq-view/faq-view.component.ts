import { Component } from '@angular/core';
import { BenefitSectionComponent } from '@project/components/molecules/benefit-section/benefit-section.component';
import { CtaSectionComponent } from '@project/components/molecules/cta-section/cta-section.component';
import { HowWorksSectionComponent } from '@project/components/molecules/how-works-section/how-works-section.component';
import { TitleHeaderComponent } from '@project/components/molecules/title-header/title-header.component';

@Component({
  standalone: true,
  selector: 'app-faq-view',
  templateUrl: './faq-view.component.html',
  imports: [
    TitleHeaderComponent,
    HowWorksSectionComponent,
    BenefitSectionComponent,
    CtaSectionComponent
  ],
  styleUrls: ['./faq-view.component.scss']
})
export class FaqViewComponent {
  constructor() {}
}
