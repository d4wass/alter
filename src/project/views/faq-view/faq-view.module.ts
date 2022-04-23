import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqViewComponent } from './faq-view.component';
import { TitleHeaderModule } from 'src/project/components/molecules/title-header/title-header.module';
import { HowWorksSectionModule } from 'src/project/components/molecules/how-works-section/how-works-section.module';
import { CtaSectionComponent } from 'src/project/components/molecules/cta-section/cta-section.component';
import { CarouselSectionModule } from 'src/project/components/organisms/carousel-section/carousel-section.module';
import { BenefitSectionModule } from 'src/project/components/molecules/benefit-section/benefit-section.module';

@NgModule({
  declarations: [FaqViewComponent, CtaSectionComponent],
  imports: [
    CommonModule,
    TitleHeaderModule,
    HowWorksSectionModule,
    CarouselSectionModule,
    BenefitSectionModule
  ]
})
export class FaqViewModule {}
