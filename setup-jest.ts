import 'zone.js/fesm2015/zone-testing-bundle.min.js';
import 'jest-preset-angular';
import { ngMocks } from 'ng-mocks';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  teardown: {
    destroyAfterEach: true
  }
});

ngMocks.autoSpy('jest');
