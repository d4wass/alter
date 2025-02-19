import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-profile-btn',
    template: `
    <ng-container>
      <button (click)="handleClick()" class="btn-default" data-test="btn-default">
        <ng-content></ng-content>
      </button>
    </ng-container>
  `,
    styleUrls: ['./profile-btn.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProfileBtnComponent {
  @Output() handleClickEvent: EventEmitter<any> = new EventEmitter<any>();

  handleClick() {
    this.handleClickEvent.emit();
  }
}
