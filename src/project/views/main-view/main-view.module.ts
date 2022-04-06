import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view-component';
import { LoginModalModule } from 'src/project/components/organisms/login-modal/login-modal.module';
import { SearchHeaderModule } from 'src/project/components/molecules/search-header/search-header.module';
import { FaqSectionModule } from 'src/project/components/organisms/faq-section/faq-section.module';
import { ReviewSectionModule } from 'src/project/components/molecules/review-section/review-section.module';
import { CarouselSectionModule } from 'src/project/components/organisms/carousel-section/carousel-section.module';

@NgModule({
  declarations: [MainViewComponent],
  imports: [
    CommonModule,
    LoginModalModule,
    SearchHeaderModule,
    FaqSectionModule,
    ReviewSectionModule,
    CarouselSectionModule
  ]
})
export class MainViewModule {}
