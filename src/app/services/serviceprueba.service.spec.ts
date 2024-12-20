import { TestBed } from '@angular/core/testing';

import { ServicepruebaService } from './serviceprueba.service';

describe('ServicepruebaService', () => {
  let service: ServicepruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicepruebaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
