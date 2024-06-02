import 'jest-preset-angular/setup-jest';
import { ResizeObserver } from '@juggle/resize-observer';

if (!('ResizeObserver' in window)) {
  global.ResizeObserver = ResizeObserver;
}
