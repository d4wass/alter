import { Routes } from '@angular/router';
import { VehicleFormComponent } from '@project/components/organisms/vehicle-form/vehicle-form.component';
import { FaqViewComponent } from '@project/views/faq-view/faq-view.component';
import { HomeViewComponent } from '@project/views/home-view/home-view-component';
import { HostViewComponent } from '@project/views/host-view/host-view.component';
import { NewUserViewComponent } from '@project/views/new-user/new-user.component';
import { NotFoundViewComponent } from '@project/views/not-found-view/not-found-view.component';
import { ProfileViewComponent } from '@project/views/profile-view/profile-view.component';
import { ReservationVehicleViewComponent } from '@project/views/reservation-confirm-view/reservation-vehicle-view.component';
import { SearchResultViewComponent } from '@project/views/search-result-view/search-result-view.component';
import { ShellComponent } from '@project/views/shell/shell.component';
import { VehicleViewComponent } from '@project/views/vehicle-view/vehicle-view.component';
import { UserProfileGuard } from 'src/guards/userProfile.guard';
import { ReservationResolver } from './resolvers/reservation.resolver';
import { VehicleResolver } from './resolvers/vehicle.resolver';

export interface urlItem {
  description: string;
  url: string;
}

export const urlList: urlItem[] = [
  { description: 'Learn more', url: 'faq' },
  { description: 'Carculator', url: 'carculator' },
  { description: 'Become a host', url: 'host' },
  { description: 'Create Account', url: 'new-user' }
];

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: HomeViewComponent },
      { path: 'host', component: HostViewComponent },
      { path: 'search', component: SearchResultViewComponent },
      { path: 'faq', component: FaqViewComponent },
      { path: 'new-user', component: NewUserViewComponent },
      { path: 'profile', component: ProfileViewComponent, canActivate: [UserProfileGuard] },
      {
        path: 'vehicle/:id',
        resolve: { vehicle: VehicleResolver },
        component: VehicleViewComponent
      },
      { path: 'addVehicle', component: VehicleFormComponent, canActivate: [UserProfileGuard] },
      {
        path: 'confirm-reservation/:id',
        resolve: { reservation: ReservationResolver },
        component: ReservationVehicleViewComponent,
        canActivate: [UserProfileGuard]
      },
      { path: '**', component: NotFoundViewComponent }
    ]
  }
];
