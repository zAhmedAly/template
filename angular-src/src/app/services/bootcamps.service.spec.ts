import { TestBed } from '@angular/core/testing';

import { BootcampsService } from './bootcamps.service';

describe('BootcampsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BootcampsService = TestBed.get(BootcampsService);
    expect(service).toBeTruthy();
  });
});
