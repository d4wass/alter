import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceSectionComponent } from './resource-section.component';
import { ResourceItemComponent } from '../../atoms/resource-item/resource-item.component';

@NgModule({
  declarations: [ResourceSectionComponent, ResourceItemComponent],
  imports: [CommonModule],
  exports: [ResourceSectionComponent]
})
export class ResourceSectionModule {}
