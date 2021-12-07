import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainViewModule } from 'src/project/views/main-view/main-view.module';
import { NotFoundViewModule } from 'src/project/views/not-found-view/not-found-view.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MainViewModule, NotFoundViewModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
