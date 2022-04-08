import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SearchHeaderModule } from 'src/project/components/molecules/search-header/search-header.module';
import { FooterModule } from 'src/project/components/organisms/footer/footer.module';
import { LoginModalModule } from 'src/project/components/organisms/login-modal/login-modal.module';
import { NavigationModule } from 'src/project/components/organisms/navigation/navigation.module';
import { FaqViewModule } from 'src/project/views/faq-view/faq-view.module';
import { HostViewModule } from 'src/project/views/host-view/host-view.module';
import { MainViewModule } from 'src/project/views/main-view/main-view.module';
import { NotFoundViewModule } from 'src/project/views/not-found-view/not-found-view.module';
import { SearchResultViewModule } from 'src/project/views/search-result-view/search-result-view.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SearchHeaderModule,
    BrowserModule,
    AppRoutingModule,
    MainViewModule,
    NotFoundViewModule,
    SearchResultViewModule,
    HostViewModule,
    FaqViewModule,
    NavigationModule,
    RouterModule,
    LoginModalModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
