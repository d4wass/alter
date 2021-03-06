import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TitleHeaderModule } from 'src/project/components/molecules/title-header/title-header.module';
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
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/+state/user/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { vehiclesReducer } from 'src/+state/vehicles/vehicle.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VehicleEffects } from '../+state/vehicles/vehicle.effects';
import { UserEffects } from '../+state/user/user.effects';
import { appReducer } from '../+state/app-state/app-state.reducer';
import { AppEffects } from '../+state/app-state/app-state.effects';
import { UserProfileGuard } from 'src/guards/userProfile.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    TitleHeaderModule,
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
    FooterModule,
    HttpClientModule,
    StoreModule.forRoot({ user: userReducer, vehicles: vehiclesReducer, app: appReducer }),
    EffectsModule.forRoot([VehicleEffects, UserEffects, AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 500
    }),
    BrowserAnimationsModule
  ],
  providers: [UserProfileGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
