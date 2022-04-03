import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FooterMenuComponent } from '../../molecules/footer-menu/footer-menu.component';
import { LanguageSelectModule } from '../../molecules/language-select/language-select.module';

@NgModule({
  declarations: [FooterComponent, FooterMenuComponent],
  imports: [CommonModule, LanguageSelectModule],
  exports: [FooterComponent]
})
export class FooterModule {}
