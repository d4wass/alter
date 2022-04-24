import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserViewComponent } from './new-user.component';
import { TitleHeaderModule } from 'src/project/components/molecules/title-header/title-header.module';

@NgModule({
  declarations: [NewUserViewComponent],
  imports: [CommonModule, TitleHeaderModule],
  exports: [NewUserViewComponent]
})
export class NewUserModule {}
