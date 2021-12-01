import { TestBed } from '@angular/core/testing';

import { LagnugageLevelService } from './lagnugage-level.service';

describe('LagnugageLevelService', () => {
  let service: LagnugageLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LagnugageLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
