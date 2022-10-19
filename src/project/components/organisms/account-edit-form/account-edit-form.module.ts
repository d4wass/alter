import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountEditFormComponent } from './account-edit-form.component';
import { UpdateUserModalComponent } from '../../molecules/update-user-modal/update-user-modal.component';
import { UpdateUserModalModule } from '../../molecules/update-user-modal/update-user-modal.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountEditFormComponent],
  imports: [CommonModule, UpdateUserModalModule, ReactiveFormsModule],
  exports: [AccountEditFormComponent]
})
export class EditAccoutnFormModule {}
