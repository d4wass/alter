import { Directive, HostListener } from '@angular/core';
import { ModalLoginService } from '../services/modal-login-service.service';

@Directive({
  selector: '[appLoginModal]'
})
export class LoginModalDirective {
  constructor(private modalLoginService: ModalLoginService) {}

  @HostListener('click', ['$event.target.className'])
  onClick(className: string) {
    if (className === 'wrapper') {
      this.modalLoginService.isVisible$.next(false);
    }
  }

  @HostListener('document:keyup.escape', ['$event'])
  onEscape(): void {
    this.modalLoginService.isVisible$.next(false);
  }
}
