import { TestBed } from '@angular/core/testing';

import { KtDemoApiService } from './kt-demo-api.service';

describe('KtDemoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KtDemoApiService = TestBed.get(KtDemoApiService);
    expect(service).toBeTruthy();
  });
});
