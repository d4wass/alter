import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffects } from './+state/app-state/app-state.effects';
import { AppReducer } from './+state/app-state/app-state.reducer';
import { ReservationEffects } from './+state/reservation/reservation.effects';
import { userReservationsReducer } from './+state/user-reservations/user-reservations.reducer';
import { UserVehiclesEffects } from './+state/user-vehicles/user-vehicles.effects';
import { userVehicleReducer } from './+state/user-vehicles/user-vehicles.reducer';
import { UserEffects } from './+state/user/user.effects';
import { userReducer } from './+state/user/user.reducer';
import { VehicleEffects } from './+state/vehicles/vehicle.effects';
import { vehiclesReducer } from './+state/vehicles/vehicle.reducer';
import { routes } from './router/routes';
import { UserProfileGuard } from './guards/userProfile.guard';
import { ReservationResolver } from './router/resolvers/reservation.resolver';
import { VehicleResolver } from './router/resolvers/vehicle.resolver';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
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
      StoreDevtoolsModule.instrument({ maxAge: 500, connectInZone: true }),
      BrowserAnimationsModule,
      UserProfileGuard,
      VehicleResolver,
      ReservationResolver
    )
  ]
}).catch((err) => console.error(err));
