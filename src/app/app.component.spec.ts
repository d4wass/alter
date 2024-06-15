import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Mock, MockModule, MockProviders } from 'ng-mocks';
import { AppEffects } from '../+state/app-state/app-state.effects';
import { ReservationEffects } from '../+state/reservation/reservation.effects';
import { UserVehiclesEffects } from '../+state/user-vehicles/user-vehicles.effects';
import { UserEffects } from '../+state/user/user.effects';
import { VehicleEffects } from '../+state/vehicles/vehicle.effects';
import { GlobalHttpErrorHandlerInterceptor } from '../interceptors/global-http-error-handler.interceptor';
import { DatepickerModule } from '../project/components/molecules/datepicker/datepicker.module';
import { TitleHeaderModule } from '../project/components/molecules/title-header/title-header.module';
import { LoginModalModule } from '../project/components/organisms/login-modal/login-modal.module';
import { VehicleFormModule } from '../project/components/organisms/vehicle-form/vehicle-form.module';
import { FaqViewModule } from '../project/views/faq-view/faq-view.module';
import { HomeViewModule } from '../project/views/home-view/home-view.module';
import { HostViewModule } from '../project/views/host-view/host-view.module';
import { NotFoundViewModule } from '../project/views/not-found-view/not-found-view.module';
import { SearchResultViewModule } from '../project/views/search-result-view/search-result-view.module';
import { VehicleViewModule } from '../project/views/vehicle-view/vehicle-view.module';
import { AppRoutingModule } from '../router/router.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      MockModule(AppRoutingModule),
      MockModule(TitleHeaderModule),
      MockModule(BrowserModule),
      MockModule(HomeViewModule),
      MockModule(VehicleViewModule),
      MockModule(NotFoundViewModule),
      MockModule(SearchResultViewModule),
      MockModule(HostViewModule),
      MockModule(FaqViewModule),
      MockModule(RouterModule),
      MockModule(LoginModalModule),
      MockModule(DatepickerModule),
      MockModule(HttpClientModule),
      MockModule(VehicleFormModule),
      MockModule(GlobalHttpErrorHandlerInterceptor),
      MockModule(EffectsModule.forRoot([])),
      MockModule(BrowserAnimationsModule)
    ],
    providers: [
      { provide: Store, useValue: { dispatch: jest.fn() } }
      // MockProviders(
      //   VehicleEffects,
      //   UserEffects,
      //   AppEffects,
      //   ReservationEffects,
      //   UserVehiclesEffects
      // )
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should match to snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });
});
