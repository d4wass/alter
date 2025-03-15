import { Component } from '@angular/core';
import { TitleHeaderComponent } from '@project/components/molecules/title-header/title-header.component';

@Component({
  standalone: true,
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  imports: [TitleHeaderComponent],
  styleUrls: ['./new-user.component.scss']
})
export class NewUserViewComponent {
  constructor() {}
}
