import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserModalComponent } from './update-user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdateUserModalComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UpdateUserModalComponent]
})
export class UpdateUserModalModule {}
