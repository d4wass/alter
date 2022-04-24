import { Component } from '@angular/core';
import { ModalLoginService } from '../../../services/modal-login/modal-login-service.service';

@Component({
  selector: 'app-login-btn',
  template: `
    <button class="login-btn" (click)="handleClick($event)">
      Log in
      <img src="assets/usericon.svg" alt="" />
    </button>
  `,
  styleUrls: ['./login-btn.component.scss']
})
export class LoginBtnComponent {
  constructor(private modalLoginService: ModalLoginService) {}

  handleClick(event: Event) {
    let target = (event.target as HTMLInputElement).className;
    this.modalLoginService.setModalVisibility(target === 'login-btn');
  }
}
