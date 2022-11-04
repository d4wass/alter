import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileGuard } from 'src/guards/userProfile.guard';
import { FaqViewComponent } from 'src/project/views/faq-view/faq-view.component';
import { HostViewComponent } from 'src/project/views/host-view/host-view.component';
import { HomeViewComponent } from 'src/project/views/home-view/home-view-component';
import { NewUserViewComponent } from 'src/project/views/new-user/new-user.component';
import { NotFoundViewComponent } from 'src/project/views/not-found-view/not-found-view.component';
import { ProfileViewComponent } from 'src/project/views/profile-view/profile-view.component';
import { SearchResultViewComponent } from 'src/project/views/search-result-view/search-result-view.component';
import { ShellComponent } from 'src/project/views/shell/shell.component';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { VehicleViewComponent } from 'src/project/views/vehicle-view/vehicle-view.component';

const routes: Routes = [
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
      { path: '**', component: NotFoundViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
