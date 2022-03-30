import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-form',
  template: ` <input type="{{ type }}" placeholder="{{ placeholder }}" class="{{ className }}" /> `,
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent {
  @Input() type?: string = 'text';
  @Input() placeholder?: string;
  @Input() className?: string = 'input';
}
