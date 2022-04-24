import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view-component';
import { LoginModalModule } from 'src/project/components/organisms/login-modal/login-modal.module';
import { FaqSectionModule } from 'src/project/components/organisms/faq-section/faq-section.module';
import { ReviewSectionModule } from 'src/project/components/molecules/review-section/review-section.module';
import { CarouselSectionModule } from 'src/project/components/organisms/carousel-section/carousel-section.module';
import { TitleHeaderModule } from 'src/project/components/molecules/title-header/title-header.module';

@NgModule({
  declarations: [MainViewComponent],
  imports: [
    CommonModule,
    LoginModalModule,
    TitleHeaderModule,
    FaqSectionModule,
    ReviewSectionModule,
    CarouselSectionModule
  ]
})
export class MainViewModule {}
