import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from 'src/project/views/main-view/main-view-component';
import { NotFoundViewComponent } from 'src/project/views/not-found-view/not-found-view.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: '**', component: NotFoundViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
