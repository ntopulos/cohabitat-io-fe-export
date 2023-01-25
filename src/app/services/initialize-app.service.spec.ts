import { TestBed } from '@angular/core/testing';

import { InitializeAppService } from './initialize-app.service';

describe('InitializeAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitializeAppService = TestBed.get(InitializeAppService);
    expect(service).toBeTruthy();
  });
});
