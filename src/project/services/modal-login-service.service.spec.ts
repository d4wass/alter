import { TestBed } from '@angular/core/testing';

import { ModalLoginServiceService } from './modal-login-service.service';

describe('ModalLoginServiceService', () => {
  let service: ModalLoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalLoginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
