import { TestBed } from '@angular/core/testing';

import { AborretaService } from './aborreta.service';

describe('AborretaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AborretaService = TestBed.get(AborretaService);
    expect(service).toBeTruthy();
  });
});
