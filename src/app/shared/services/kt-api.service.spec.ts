import { TestBed } from '@angular/core/testing';

import { KtApiService } from './kt-api.service';

describe('KtApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KtApiService = TestBed.get(KtApiService);
    expect(service).toBeTruthy();
  });
});
