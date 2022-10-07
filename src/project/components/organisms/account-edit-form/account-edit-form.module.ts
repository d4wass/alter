import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountEditFormComponent } from './account-edit-form.component';
import { UpdateUserModalComponent } from '../../molecules/update-user-modal/update-user-modal.component';
import { UpdateUserModalModule } from '../../molecules/update-user-modal/update-user-modal.module';

@NgModule({
  declarations: [AccountEditFormComponent],
  imports: [CommonModule, UpdateUserModalModule],
  exports: [AccountEditFormComponent]
})
export class EditAccoutnFormModule {}
