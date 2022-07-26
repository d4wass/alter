import { Directive, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from 'src/+state/app-state/app-state.actions';

@Directive({
  selector: '[appLoginModal]'
})
export class LoginModalDirective {
  constructor(private store: Store) {}

  @HostListener('click', ['$event.target.className'])
  @HostListener('document:keyup.escape', ['$event.key'])
  closeModal(event: string) {
    if (event === 'wrapper' || event === 'Escape')
      this.store.dispatch(AppActions.closeLoginModalOnEvent());
  }
}
