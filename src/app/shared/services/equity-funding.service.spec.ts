import { TestBed } from '@angular/core/testing';

import { EquityFundingService } from './equity-funding.service';

describe('EquityFundingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquityFundingService = TestBed.get(EquityFundingService);
    expect(service).toBeTruthy();
  });
});
