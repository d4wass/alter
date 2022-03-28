import { Directive, HostListener } from '@angular/core';
import { ModalLoginService } from '../services/modal-login-service.service';

@Directive({
  selector: '[appLoginModal]'
})
export class LoginModalDirective {
  constructor(private modalLoginService: ModalLoginService) {}

  @HostListener('click')
  onClick() {
    this.modalLoginService.isVisible$.next(false);
  }
}
