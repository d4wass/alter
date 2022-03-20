import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqViewComponent } from 'src/project/views/faq-view/faq-view.component';
import { HostViewComponent } from 'src/project/views/host-view/host-view.component';
import { MainViewComponent } from 'src/project/views/main-view/main-view-component';
import { NewUserViewComponent } from 'src/project/views/new-user/new-user.component';
import { NotFoundViewComponent } from 'src/project/views/not-found-view/not-found-view.component';
import { SearchResultViewComponent } from 'src/project/views/search-result-view/search-result-view.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'host', component: HostViewComponent },
  { path: 'search', component: SearchResultViewComponent },
  { path: 'faq', component: FaqViewComponent },
  { path: 'new-user', component: NewUserViewComponent },
  { path: '**', component: NotFoundViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
