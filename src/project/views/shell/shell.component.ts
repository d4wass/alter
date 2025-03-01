import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@project/components/organisms/footer/footer.component';
import { NavigationComponent } from '@project/components/organisms/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, RouterModule],
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  constructor() {}
}
