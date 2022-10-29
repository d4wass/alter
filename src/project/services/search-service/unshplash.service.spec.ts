import { TestBed } from '@angular/core/testing';

import { UnshplashService } from './unshplash.service';

describe('UnshplashService', () => {
  let service: UnshplashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnshplashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
