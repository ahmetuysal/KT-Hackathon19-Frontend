import { TestBed } from '@angular/core/testing';

import { FundraisingService } from './fundraising.service';

describe('FundraisingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FundraisingService = TestBed.get(FundraisingService);
    expect(service).toBeTruthy();
  });
});
