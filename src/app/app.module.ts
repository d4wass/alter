import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../router/router.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/+state/user/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { vehiclesReducer } from 'src/+state/vehicles/vehicle.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VehicleEffects } from '../+state/vehicles/vehicle.effects';
import { UserEffects } from '../+state/user/user.effects';
import { AppReducer } from '../+state/app-state/app-state.reducer';
import { AppEffects } from '../+state/app-state/app-state.effects';
import { UserProfileGuard } from 'src/guards/userProfile.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleResolver } from 'src/router/resolvers/vehicle.resolver';
import { ReservationEffects } from 'src/+state/reservation/reservation.effects';
import { ReservationResolver } from 'src/router/resolvers/reservation.resolver';
import { userVehicleReducer } from 'src/+state/user-vehicles/user-vehicles.reducer';
import { UserVehiclesEffects } from 'src/+state/user-vehicles/user-vehicles.effects';
import { userReservationsReducer } from 'src/+state/user-reservations/user-reservations.reducer';
import { GlobalInterceptorModuleModule } from 'src/interceptors/global-interceptor-module.module';
import { VehicleViewComponent } from '@project/views/vehicle-view/vehicle-view.component';
import { TitleHeaderComponent } from '@project/components/molecules/title-header/title-header.component';
import { SearchResultViewComponent } from '@project/views/search-result-view/search-result-view.component';
import { HomeViewComponent } from '@project/views/home-view/home-view-component';
import { NotFoundViewComponent } from '@project/views/not-found-view/not-found-view.component';
import { HostViewComponent } from '@project/views/host-view/host-view.component';
import { FaqViewComponent } from '@project/views/faq-view/faq-view.component';
import { VehicleFormComponent } from '@project/components/organisms/vehicle-form/vehicle-form.component';
import { DatepickerComponent } from '@project/components/molecules/datepicker/datepicker.component';

@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule,
    TitleHeaderComponent,
    BrowserModule,
    HomeViewComponent,
    VehicleViewComponent,
    NotFoundViewComponent,
    SearchResultViewComponent,
    HostViewComponent,
    FaqViewComponent,
    DatepickerComponent,
    HttpClientModule,
    VehicleFormComponent,
    GlobalInterceptorModuleModule,
    StoreModule.forRoot({
      user: userReducer,
      vehicles: vehiclesReducer,
      app: AppReducer,
      userVehicles: userVehicleReducer,
      userReservations: userReservationsReducer
    }),
    EffectsModule.forRoot([
      VehicleEffects,
      UserEffects,
      AppEffects,
      ReservationEffects,
      UserVehiclesEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 500,
      connectInZone: true
    })
  ],
  providers: [UserProfileGuard, VehicleResolver, ReservationResolver],
  bootstrap: []
})
export class AppModule {}
